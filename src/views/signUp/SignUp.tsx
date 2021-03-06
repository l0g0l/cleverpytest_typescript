//Change the library react-validation to reack-hook-form
import { useState} from "react";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup'; //validation schema
import { Link } from 'react-router-dom'
import Header from "../../components/layout/header/Header";
const crypto = require('crypto');

type UserSubmitForm = {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    acceptTerms: boolean;
};

const SignUp = () => {
    // eslint-disable-next-line
    const [successfull, setSuccessfull] = useState<Boolean>(false);
    const [message, setMessage] = useState<string>("");

    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .required('Username is required')
            .min(3, 'Username must be at least 3 characters')
            .max(20, 'Username must not exceed 20 characters'),
        email: Yup.string()
            .required('Email is required')
            .email('Email is invalid'),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters')
            .max(10, 'Password must not exceed 10 characters'),
        confirmPassword: Yup.string()
            .required('Confirm Password is required')
            .oneOf([Yup.ref('password'), null], 'Confirm Password does not match'),
        acceptTerms: Yup.bool().oneOf([true], 'Accept Terms is required')
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<UserSubmitForm>({
        resolver: yupResolver(validationSchema)
    });


    const onSubmit = handleSubmit(({ username, email, password, confirmPassword, acceptTerms }) => {
        // store the data in the LocalStorage
        if (username && email && password && confirmPassword && acceptTerms) {
            if (localStorage.getItem("email") === email) {
                setMessage('Registered user')
                setSuccessfull(false)
            } else {
                localStorage.setItem("username", `${username}`)
                localStorage.setItem("email", `${email}`)
                localStorage.setItem("password", crypto.createHash('sha256').update(password).digest('base64'))

                setMessage('User successfully registered')
                setSuccessfull(true)
            }
        }
    });


    return (
        <div className="container-signup">
            <div className="header">
                <header>
                    <Header />
                </header>
            </div>
            <main>
                <form onSubmit={onSubmit}>
                    <div className="formdiv">
                        <label>Username</label>
                        <input
                            type="text"
                            {...register('username')}
                            className={`input ${errors.username ? 'is-invalid' : ''}`}
                        />
                        <div className="alert">{errors.username?.message}</div>
                    </div>

                    <div className="formdiv">
                        <label>Email</label>
                        <input
                            type="text"
                            {...register('email')}
                            className={`input ${errors.email ? 'is-invalid' : ''}`}
                        />
                        <div className="alert">{errors.email?.message}</div>
                    </div>

                    <div className="formdiv">
                        <label>Password</label>
                        <input
                            type="password"
                            {...register('password')}
                            className={`input ${errors.password ? 'is-invalid' : ''}`}
                        />
                        <div className="alert">{errors.password?.message}</div>
                    </div>
                    <div className="formdiv">
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            {...register('confirmPassword')}
                            className={`input ${errors.confirmPassword ? 'is-invalid' : ''
                                }`}
                        />
                        <div className="alert">
                            {errors.confirmPassword?.message}
                        </div>
                    </div>

                    <div className="form-check">
                        <input
                            type="checkbox"
                            {...register('acceptTerms')}
                            className={`alert ${errors.acceptTerms ? 'is-invalid' : ''
                                }`}
                        />
                        <label htmlFor="acceptTerms" className="label-check">
                            I have read and agree to the Terms
                        </label>
                    </div>
                    <div className="alert alert-check">{errors.acceptTerms?.message}</div>

                    <div className="formdiv">
                        <button type="submit" className="btn-signup">
                            Sign Up
                        </button>
                        <button
                            type="button"
                            onClick={() => reset()}
                            className="btn-signup btn-reset ">
                            Reset
                        </button>
                       
                    </div>
                </form>
                <div>
                    <p className="success">{message}</p>
                    <p className="form-p">Already created an account? <Link to='/login'><strong>Log in</strong></Link></p>

                </div>
            </main>
        </div>
    );
};

export default SignUp;