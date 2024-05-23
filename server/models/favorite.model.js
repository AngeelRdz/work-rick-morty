import mongoose from "mongoose";
import validate from "mongoose-validator";

const urlValidator = [
    validate({
        validator: "isURL",
        message: "Debe ser una URL válida",
        protocols: ["http", "https"],
    }),
    validate({
        validator: "isURL",
        message: "Debe ser una URL de imagen válida",
        protocols: ["http", "https"],
        require_tld: true,
        require_protocol: true,
        allow_underscores: true,
        allow_trailing_dot: false,
    }),
];

const favoriteChema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        validate: urlValidator,
    },
    status: {
        type: String,
    },
    location: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, {
    timestamps: true,
});

export default mongoose.model("Favorites", favoriteChema);
