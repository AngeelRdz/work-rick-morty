import axios from './axios';

export const getFavoritesRequest = () => axios.get(`/favorites`);

export const createFavoritesRequest = favorite => axios.post(`/favorites`, favorite);

export const deleteFavoritesRequest = id => axios.delete(`/favorites/${id}`, id);
