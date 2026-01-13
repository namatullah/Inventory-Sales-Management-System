import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./src/routes/authRoutes.js";

const app = express();

app.use("/api/auth", authRoutes);

connectDB();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server is running on the PORT: ", PORT));
