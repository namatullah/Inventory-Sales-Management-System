import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getUserQuantitySale } from "../controllers/reportController.js";

const router = express.Router();

router.get("/", protect, getUserQuantitySale);

export default router;
