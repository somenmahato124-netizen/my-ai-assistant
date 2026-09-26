import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import authRouter from "./routes/auth.router.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

// ===============================
// CORS
// ===============================
app.use(
    cors({
        origin: "https://my-ai-assistant-1-yxc7.onrender.com",
        credentials: true
    })
);

// ===============================
// MIDDLEWARE
// ===============================
app.use(express.json());
app.use(cookieParser());

// ===============================
// ROUTES
// ===============================
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

// ===============================
// START SERVER
// ===============================
const startServer = async () => {
    try {
        await connectDb();

        app.listen(port, () => {
            console.log(`Server started on port ${port}`);
        });

    } catch (error) {
        console.error("Server startup error:", error);
        process.exit(1);
    }
};

startServer();