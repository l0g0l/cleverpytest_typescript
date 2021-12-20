import React, { useState, useRef } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Header from "../../components/layout/header/Header";
import { useDispatch } from 'react-redux'
import home from '../../assets/home.png'



const crypto = require('crypto');

type UserLoginForm = {
    email: string;
    password: string;
};


const Login = () => {

    const validationSchema = Yup.object().shape({

        email: Yup.string()
            .required('Email is required')
            .email('Email is invalid'),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters')
            .max(40, 'Password must not exceed 40 characters'),

    });

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<UserLoginForm>({
        resolver: yupResolver(validationSchema)
    });


    const onSubmit = (data: UserLoginForm) => {
        console.log(JSON.stringify(data, null, 2));
    };

    /*     const dispatch = useDispatch(); //llamo a la función para poder utilizarla
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
     */

    /*     const handleLogin = (e) => {
            e.preventDefault();
    
    
            setMessage("");
            setLoading(true);
    
    
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
     */
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

            <main>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="formdiv">
                        <label>Email</label>
                        <input
                            type="text"
                            {...register('email')}
                            className={`input ${errors.email ? 'is-invalid' : ''}`}
                        />
                        <div className="invalid-feedback">{errors.email?.message}</div>
                    </div>

                    <div className="formdiv">
                        <label>Password</label>
                        <input
                            type="password"
                            {...register('password')}
                            className={`input ${errors.password ? 'is-invalid' : ''}`}
                        />
                        <div className="invalid-feedback">{errors.password?.message}</div>
                    </div>



                    <div className="formdiv">
                        <button type="submit" className="btn-login">
                            Log In
                        </button>

                    </div>
                </form>
            </main>
            <div >
                <p className="account-msg">Still no account? <Link to="/signup"><strong>Sign Up</strong></Link></p>
            </div>
        </div>
    )
}

export default Login