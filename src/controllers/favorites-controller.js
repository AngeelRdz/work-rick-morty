import Favorite from '../models/favorite.model.js';

export const getFavorites = async (req, res) => {
    try {
        const favorites = await Favorite.find({ user: req.user.id }).populate("user");
        res.json(favorites);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const createFavorite = async (req, res) => {
    const { name, imagen, status, date } = req.body;

    try {
        const newFavorite = new Favorite({
            name,
            imagen,
            status,
            date,
            user: req.user.id,
        });

        const favoriteSaved = await newFavorite.save();
        res.json(favoriteSaved);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteFavorite = async (req, res) => {
    const { id } = req.params;

    try {
        await Favorite.findByIdAndDelete(id);
        res.json({ message: "Favorite deleted" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

