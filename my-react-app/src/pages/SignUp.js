import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'


import {auth} from "../firebase";
import './css/signup.css'

function SignUp() {
    const navigate = useNavigate(); //navigation
    const [values, setValues] = useState({
        name: "",
        email: "",
        pass: "",
    });

    const [errorMsg, setErrorMsg] = useState("");
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

    const handleSubmission = (event) => {
        console.log(values);
        event.preventDefault();

        const valid = validationForm();

        if(valid) {

            setErrorMsg("");
            setSubmitButtonDisabled(true);

            createUserWithEmailAndPassword(auth, values.email, values.pass)
                .then(async (res) => {
                    //console.log(res);
                    setSubmitButtonDisabled(false);
                    const user = res.user;
                    await updateProfile(user, {
                        displayName: values.name,
                    });
                    navigate("/Login");
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
        let nameReg = /^[A-Za-z\s]+$/; //name valdiation regex
        if (!values.name || !values.email || !values.pass) {
            setErrorMsg("Fill all fields");
            return;
        }

        if (!nameReg.test(values.name)) {
            setErrorMsg('Name not valid !!!');
            return false;
        }

        return true;
    }



    return(
        <div className="login-page">
            <div className="form">
                <form className="login-form">
                    <h1>SignUp</h1>
                    <input required type="text" placeholder="name"onChange={(event) => setValues((prev)=>({...prev, name: event.target.value}))}/>
                    <input required type="text" placeholder="email"onChange={(event) => setValues((prev)=>({...prev, email: event.target.value}))}/>
                    <input required type="password" onChange={(event) => setValues((prev)=>({...prev, pass: event.target.value}))} placeholder="password"/>

                    <button type={"submit"} disabled={submitButtonDisabled} onClick={handleSubmission}>Sign In</button>
                    <Link to="/Login" className={"lnk"}>
                        <p className={"lnk"}>Already a User? Login</p>
                    </Link>
                </form>
            </div>
        </div>

    )
}

export default SignUp;


















