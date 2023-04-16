import React, {useState, useEffect} from 'react';
import { BrowserRouter, Route, Routes, Link, Router } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Home from './pages/HomePage';

import { auth } from "./firebase";
import NewContact from "./pages/NewContact";

function App() {

    const [userEmail, setUserEmail] = useState("");
    const [userName, setUserName] = useState("");

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                setUserName(user.displayName);
                setUserEmail(user.email);
            } else {
                setUserEmail("");
                setUserName("");
            }
        });
    }, []);

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path={'/HomePage'} element={<Home />} />
                    <Route path={'/Login'} element={<Login />} />
                    <Route path={'/NewContact'} element={<NewContact isEdit={false} />} />
                    <Route path={'/NewContact/:id'} element={<NewContact isEdit={true} />} />
                    <Route index element={<SignUp />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;