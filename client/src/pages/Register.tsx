import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

import styles from "../components/Search/search.module.scss";

interface RegisterFormInputs {
    username: string;
    email: string;
    password: string;
}

const Register: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormInputs>();
    const { register: registerUser, isAuthenticated, errors: registerErrors } = useAuth();
    const navigate = useNavigate();

    console.log('isAuthenticated:', isAuthenticated);

    useEffect(() => {
        if (isAuthenticated) {
            console.log('Redirect to home');
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    const onSubmit: SubmitHandler<RegisterFormInputs> = async data => {
        console.log('data:', data);
        registerUser(data);
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className={`${styles.search} d-flex flex-sm-column flex-column align-items-center justify-content-center gap-4 mb-5`}
        >
            <input
                {...register("username", { required: true })}
                placeholder="userName"
                className={styles.input}
                type="text"
            />
            {errors.username && <span className="text-danger">userName is required</span>}

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

            {Array.isArray(registerErrors) && registerErrors.map((error: string, index: number) => (
                <span key={index} className="text-danger">{error}</span>
            ))}

            <button
                type="submit"
                className={`${styles.btn} btn btn-primary fs-5`}
            >
                Registrar
            </button>

            <p className="text-center">
                ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
            </p>
        </form>
    );
};

export default Register;
