import dotenv from 'dotenv'
import connectDB from "./db/index.js";
import { app } from './app.js';

dotenv.config()


const PORT = process.env.PORT || 8000;

connectDB()
    .then(() => {
        const server = app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

        server.on("error", (error) => {
            console.log("Server error:", error);
        });
    })
    .catch((error) => {
        console.log("DB connection failed:", error);
    });



