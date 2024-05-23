import axios from './axios';

export const registerRequest = user => axios.post(`/register`, user);

export const loginRequest = user => axios.post(`/login`, user);

export const logoutRequest = () => axios.post(`/logout`);

export const favoritesRequest = () => axios.get(`/favorites`);

export const addFavoriteRequest = favorite => axios.post(`/favorites`, favorite);

export const deleteFavoriteRequest = favoriteId => axios.delete(`/favorites/${favoriteId}`);

export const verifyTokenRequest = () => axios.get(`/verify`);
