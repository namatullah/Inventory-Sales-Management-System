import dotenv from "dotenv";
dotenv.config();
import express from "express";
import path from "path";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
const PORT = process.env.PORT || 5000;
app.listen(500, () => console.log("Server is running on the PORT: ", PORT));
