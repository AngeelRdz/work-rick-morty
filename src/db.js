import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost/test");
        console.log("Database connected");
    } catch (error) {
        console.error("Error connecting to database: ", error);
    }
}
