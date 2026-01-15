import express from "express";
import { createPrice, getPrices } from "../controllers/priceController.js";

const router = express.Router();

router.get("/", getPrices);
router.post("/", createPrice);

export default router;
