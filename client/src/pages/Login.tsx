import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

import styles from "../components/Search/search.module.scss";

interface LoginFormInputs {
    username: string;
    email: string;
    password: string;
}

const Login: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
    const { login: loginUser, isAuthenticated, errors: loginErrors } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            console.log('Redirect to home');
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    const onSubmit: SubmitHandler<LoginFormInputs> = async data => {
        console.log('data:', data);
        loginUser(data);
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className={`${styles.search} d-flex flex-sm-column flex-column align-items-center justify-content-center gap-4 mb-5`}
        >
            <input
                {...register("email", { required: true })}
                placeholder="Email"
                className={styles.input}
                type="email"
            />
            {errors.email && <span className="text-danger">Email is required</span>}

            <input
                {...register("password", { required: true })}
                placeholder="Password"
                className={styles.input}
                type="password"
            />
            {errors.password && <span className="text-danger">Password is required</span>}

            {Array.isArray(loginErrors) && loginErrors.map((error: string, index: number) => (
                <span key={index} className="text-danger">{error}</span>
            ))}

            <button
                type="submit"
                className={`${styles.btn} btn btn-primary fs-5`}
            >
                Entrar
            </button>

            <p className="text-center">
                ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
            </p>
        </form>
    );
};

export default Login;
