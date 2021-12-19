import React, { useState, useRef } from "react";
import { Link, useNavigate } from 'react-router-dom'
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Header from "../../components/layout/header/Header";
import { useDispatch } from 'react-redux'
import home from '../../assets/home.png'



const crypto = require('crypto');

const required = (value) => {
    if (!value) {
        return (
            <div className="alert" role="alert">
                Required Field
            </div>
        );
    }
};

const Login = (props) => {
    const dispatch = useDispatch(); //llamo a la función para poder utilizarla
    const form = useRef();
    const checkBtn = useRef();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // eslint-disable-next-line
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();


    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };


    const handleLogin = (e) => {
        e.preventDefault();


        setMessage("");
        setLoading(true);

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            if (localStorage.getItem("email") === email) {
                const password_hash = crypto.createHash('sha256').update(password).digest('base64')
                if (localStorage.getItem("password") === password_hash) {
                    console.log(props)
                    dispatch({ // manda al store el login a true, es decir, que ya está logado
                        type: 'LOGIN',
                        is_logged: true
                    })
                    navigate('/')
                } else {
                    setLoading(false);
                    setMessage('Invalid Credentials');
                }
            } else {
                setLoading(false);
                setMessage('Invalid Credentials');
            }

        } else {
            setLoading(false);
        }
    };

    return (
        <div className="container-login">
            <div className="header">
                <header>
                    <Header />
                </header>
            </div>
            <div className="container-welcome">
                <p><Link to="/"><img src={home} className="welcome" alt="home icon" /></Link></p>
            </div>
            <main className="form">
                <Form onSubmit={handleLogin} ref={form}>
                    <div className="formdiv">
                        <label htmlFor="email">Email</label>
                        <Input
                            type="text"
                            className="input"
                            id="email"
                            value={email}
                            onChange={onChangeEmail}
                            validations={[required]}
                            aria-describedby="email"
                            title="email"
                        />
                    </div>
                    <div className="formdiv">
                        <label htmlFor="password">Password</label>
                        <Input
                            type="password"
                            className="input"
                            id="password"
                            value={password}
                            onChange={onChangePassword}
                            validations={[required]}
                            aria-describedby="password"
                            title="password"
                        />
                    </div>
                    <button className="btn-login" >
                        <span>Login</span>
                    </button>

                    {message && (
                        <div >
                            <div className="alert " role="alert">
                                {message}
                            </div>
                        </div>
                    )}
                    <CheckButton style={{ display: "none" }} ref={checkBtn} />
                </Form>
            </main>
            <div >
                <p className="account-msg">Still no account? <Link to="/signup"><strong>Sign Up</strong></Link></p>
            </div>
        </div>
    )
}

export default Login