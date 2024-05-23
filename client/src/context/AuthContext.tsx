import React, { createContext, ReactNode, useState, useContext, useEffect } from "react";
import { AxiosError } from 'axios';
import { registerRequest, loginRequest, verifyTokenRequest } from '../api/auth';
import Cookies from 'js-cookie';

interface User {
    id: string;
    username: string;
    email: string;
}

interface AuthContextProps {
    user: User | null;
    isAuthenticated: boolean;
    errors: string | null;
    loading: boolean;
    register: (user: Omit<User, 'id'>) => Promise<void>;
    login: (user: Omit<User, 'id'>) => Promise<void>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
    user: null,
    isAuthenticated: false,
    errors: null,
    loading: true,
    register: async () => {},
    login: async () => {},
    logout: () => {},
});

export const useAuth = (): AuthContextProps => {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    return context;
}

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [errors, setErrors] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const register = async (userData: Omit<User, 'id'>) => {
        console.log("Register", userData);

        try {
            const res = await registerRequest(userData);
            console.log('res:', res.data);
            
            setUser(res.data);
            setIsAuthenticated(true);
        } catch (error) {
            if (error instanceof AxiosError) {
                console.error("Error registering user", error.response?.data);
                setErrors(error.response?.data);
            } else {
                console.error("Error registering user", error);
                setErrors("An unexpected error occurred.");
            }
        }
    };

    const login = async (userData: Omit<User, 'id'>) => {
        try {
            const res = await loginRequest(userData);
            console.log("Login::", res);
            setUser(res.data);
            setIsAuthenticated(true);
        } catch (error) {
            if (error instanceof AxiosError) {
                console.error("Error registering user", error.response?.data);
                setErrors(error.response?.data);
            } else {
                console.error("Error registering user", error);
                setErrors("An unexpected error occurred.");
            }
        }
        
    };

    const logout = async () => {
        Cookies.remove('token');
        setUser(null);
        setIsAuthenticated(false);
    };

    useEffect(() => {
        if (errors && errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors(null);
            }, 3000);

            return () => {
                clearTimeout(timer);
            };
        }
    }, [errors]);

    useEffect(() => {
        async function checkLogin() {
            const cookies = Cookies.get();
            console.log('TOKEN::', cookies.token);

            if (!cookies.token) {
                setIsAuthenticated(false);
                setLoading(false);
                return setUser(null);
            }
        
            try {
                const res = await verifyTokenRequest(cookies.token);
                console.log('res:', res.data);

                if (!res.data) {
                    setLoading(false);
                    setIsAuthenticated(false);
                    return;
                }

                setIsAuthenticated(true);
                setUser(res.data);
                setLoading(false);
            } catch (error) {
                setIsAuthenticated(false);
                setUser(null);
                setLoading(false);
            }
        }
        checkLogin();
    }, []);
    
    return (
        <AuthContext.Provider value={{
            user,
            register,
            isAuthenticated,
            errors,
            login,
            logout,
            loading
        }}>
            {children}
        </AuthContext.Provider>
    );
};
