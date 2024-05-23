import React, { createContext, ReactNode, useState, useContext, useEffect } from "react";
import { AxiosError } from 'axios';
import { createFavoritesRequest, getFavoritesRequest, deleteFavoritesRequest } from '../api/favorite.js';

interface User {
    _id: number;
    id: number;
    name: string;
    image: string;
    status: string;
    location: string;
}

interface FavoriteContextProps {
    isAuthenticated: boolean;
    errors: string | null;
    loading: boolean;
    list: User[];
    createFavorite: (user: User) => Promise<void>;
    getFavorites: () => Promise<void>;
    deleteFavorite: (id: number) => Promise<void>;
}

export const FavoriteContext = createContext<FavoriteContextProps>({
    isAuthenticated: false,
    errors: null,
    loading: true,
    list: [],
    createFavorite: async () => {},
    getFavorites: async () => {},
    deleteFavorite: async () => {},
});

interface FavoriteProviderProps {
    children: ReactNode;
}

export const useFavorite = () => {
    const context = useContext(FavoriteContext);

    if (!context) {
        throw new Error('useFavorite must be used within a FavoriteProvider');
    }

    return context;
}

export const FavoriteProvider: React.FC<FavoriteProviderProps> = ({ children }) => {
    const [list, setList] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState<string | null>(null);

    const getFavorites = async () => {
        setLoading(true);
        try {
            const res = await getFavoritesRequest();
            console.log('res:', res.data);
            setList(res.data);
        } catch (error) {
            if (error instanceof AxiosError) {
                console.error("Error getting favorites", error);
                setErrors(error.response?.data.message || "Error getting favorites");
            }
        } finally {
            setLoading(false);
        }
    };

    const createFavorite = async (userData: User) => {
        console.log("Register favorited:", userData);

        try {
            const res = await createFavoritesRequest(userData);
            setList((prevList) => [...prevList, res.data]);
            console.log('res:', res.data);
        } catch (error) {
            if (error instanceof AxiosError) {
                console.error("Error create Favorite:", error);
            }
        }
    };

    const deleteFavorite = async (id: number) => {
        console.log("Delete favorite:", id);

        try {
            const res = await deleteFavoritesRequest(id);
            
            if (res.status === 200) {
                console.log('Entre Favorite deleted');
                setList(list.filter((list) => list._id !== id));
            }
            
            console.log('ress:', res);
        } catch (error) {
            if (error instanceof AxiosError) {
                console.error("Error delete Favorite:", error);
            }
        }
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

    return (
        <FavoriteContext.Provider value={{
            getFavorites,
            isAuthenticated: false,
            errors: null,
            loading,
            list,
            createFavorite,
            deleteFavorite,
        }}>
            {children}
        </FavoriteContext.Provider>
    );
};

