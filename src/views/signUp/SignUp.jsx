import React, { useState, useRef } from "react";
import { Link } from 'react-router-dom'
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import validator from 'validator';
import Header from "../../components/layout/header/Header";


//Library to validate the form
const crypto = require('crypto');

const required = (value) => {
    if (!value.toString().trim().length) {
        return (
            <div className="alert" role="alert">
                Required Field
            </div>
        );
    }
};

const validEmail = (value) => {
    if (!validator.isEmail(value)) {
        return (
            <div className="alert " role="alert">
                Invalid Email
            </div>
        );
    }
};

const vusername = (value) => {
    if (!value) {
        return (
            <div className="alert " role="alert">
                Please, completed your Username
            </div>
        );
    }
};

const vpassword = (value) => {
    if ((value.length < 6 || value.length > 10)) {
        return (
            <div className="alert " role="alert">
                Must be between 6 and 10 characters
            </div>
        );
    }
};

const Register = () => {
    const form = useRef();
    const checkBtn = useRef();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");

    const onChangeUsername = (e) => {
        const name = e.target.value;
        setUsername(name);
    };

    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };
    const handleRegister = (e) => {
        e.preventDefault();

        setMessage("");
        setSuccessful(false);

        form.current.validateAll();

        //storage data in
        if (checkBtn.current.context._errors.length === 0) {
            if (localStorage.getItem("email") === email) {
                setMessage('Registered user')
                setSuccessful(false)
            } else {
                localStorage.setItem("username", `${username}`)
                localStorage.setItem("email", `${email}`)
                localStorage.setItem("password", crypto.createHash('sha256').update(password).digest('base64'))

                setMessage('User successfully registered')
                setSuccessful(true)
            }
        }
    };

    return (
        <div className="container-signup">
            <div className="header">
                <header>
                    <Header />
                </header>
            </div>
            <main className="form">

                <Form onSubmit={handleRegister} ref={form}>
                    {!successful && (
                        <div>
                            <div className="formdiv">
                                <label htmlFor="username">Username</label>
                                <Input
                                    type="text"
                                    className="input" id="username"
                                    value={username}
                                    onChange={onChangeUsername}
                                    validations={[required, vusername]}
                                    aria-describedby="username"
                                    title="username" />
                            </div>

                            <div className="formdiv">
                                <label htmlFor="email">Email</label>
                                <Input
                                    type="text"
                                    className="input" id="email"
                                    value={email}
                                    onChange={onChangeEmail}
                                    validations={[required, validEmail]}
                                    aria-describedby="email"
                                    title="email" />
                            </div>

                            <div className="formdiv ">
                                <label className="label" htmlFor="password">Password</label>
                                <Input
                                    type="password"
                                    className="input" id="password"
                                    value={password}
                                    onChange={onChangePassword}
                                    validations={[required, vpassword]}
                                    aria-describedby="password"
                                    title="password" />
                            </div>

                            <div >
                                <button className="btn-signup"><span>Sign Up</span></button>
                            </div>
                        </div>
                    )}
                    {message && (
                        <div >
                            <div
                                className={successful ? "success" : "alert "}
                                role="alert"
                            >
                                {message}
                            </div>
                        </div>
                    )}
                    <CheckButton style={{ display: "none" }} ref={checkBtn} />
                </Form>
                <div>
                    <p className="form-p">Already created an account? <Link to='/login'><strong>Log in</strong></Link></p>

                </div>
            </main>
        </div>
    );
};

export default Register;