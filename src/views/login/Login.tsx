import { useState, ChangeEvent } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux'
import Header from "../../components/layout/header/Header";
import home from '../../assets/home.png'
const crypto = require('crypto');

type UserLoginForm = {
    email: string;
    password: string;
};


const Login = () => {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const dispatch = useDispatch(); //llamo a la función para poder utilizarla
    // eslint-disable-next-line
    const [loading, setLoading] = useState<Boolean>(false);
    const [message, setMessage] = useState<string>("");
    const navigate = useNavigate();

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .required('Email is required'),
        password: Yup.string()
            .required('Password is required')
    });


    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<UserLoginForm>({
        resolver: yupResolver(validationSchema)
    });

    const onChangeEmail = ({ target }: ChangeEvent<HTMLInputElement>) => {
        const email = target.value
        setEmail(email);
    };
    const onChangePassword = ({ target }: ChangeEvent<HTMLInputElement>) => {
        const password = target.value
        setPassword(password);
    };


    const onSubmit = (data: UserLoginForm) => {
        console.log(JSON.stringify(data, null, 2));
        setMessage("");
        setLoading(true);

        if (email && password) {
            if (localStorage.getItem("email") === email) {
                const password_hash = crypto.createHash('sha256').update(password).digest('base64')
                if (localStorage.getItem("password") === password_hash) {

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

            <main>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="formdiv">
                        <label>Email</label>
                        <input
                            type="text"
                            {...register('email')}
                            onChange={onChangeEmail}
                            className={`input ${errors.email ? 'is-invalid' : ''}`}
                        />
                        <div className="alert">{errors.email?.message}</div>
                    </div>

                    <div className="formdiv">
                        <label>Password</label>
                        <input
                            type="password"
                            {...register('password')}
                            onChange={onChangePassword}
                            className={`input ${errors.password ? 'is-invalid' : ''}`}
                        />
                        <div className="alert">{errors.password?.message}</div>
                    </div>

                    <div className="formdiv">
                        <button type="submit" className="btn-login">
                            Log In
                        </button>

                    </div>
                </form>
            </main>
            <div >
                <p className="success">{message}</p>
                <p className="account-msg">Still no account? <Link to="/signup"><strong>Sign Up</strong></Link></p>
            </div>
        </div>
    )
}

export default Login