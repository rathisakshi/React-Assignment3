import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";


import {auth} from "../firebase";
import './css/signup.css'

function Login() {

    const navigate = useNavigate(); //navigation
    const [values, setValues] = useState({
        email: "",
        pass: ""
    });

    const [errorMsg, setErrorMsg] = useState(""); //storing error messages
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

    const handleSubmission = (event) => {
        event.preventDefault();
        const valid = validationForm();

        if (valid) {
            setErrorMsg("");

            setSubmitButtonDisabled(true);

            signInWithEmailAndPassword(auth, values.email, values.pass ,values.name)
                .then(async (res) => {
                    setSubmitButtonDisabled(false);
                    navigate("/HomePage");
                })
                .catch((err) => {
                    setSubmitButtonDisabled(false);
                    setErrorMsg(err.message);
                    alert(err.message);
                });
        } else {
            console.log(errorMsg);
        }
    };

    const validationForm = () => {

        if (!values.email || !values.pass) {
            setErrorMsg("Fill all fields");
            return false;
        }
        return true;
    }


    return(
        <div className="login-page">
            <div className="form">
                <form className="login-form">
                    <h1>Login</h1>
                    <input required type="text" placeholder="email" onChange={(event) => setValues((prev) => ({ ...prev, email: event.target.value }))}/>
                    <input required type="password" onChange={(event) => setValues((prev) => ({ ...prev, pass: event.target.value })) } placeholder="password"/>
                    <button disabled={submitButtonDisabled} onClick={handleSubmission}>login</button>
                </form>

            </div>
        </div>
    )
}

export default Login;


















