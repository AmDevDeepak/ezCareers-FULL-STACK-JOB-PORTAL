import mongoose from "mongoose";
import config from "./serverConfig.js";
const { DB_URI } = config;
const connectToDB = async () => {
    try {
        await mongoose.connect(DB_URI);
        console.log("Connect to database.");
    } catch (error) {
        console.log("Error connecting to database", error);
    }
}
export default connectToDB;