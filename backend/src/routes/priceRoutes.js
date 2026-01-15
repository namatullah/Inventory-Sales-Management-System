import express from "express";
import { createPrice, deletePrice, getPrices } from "../controllers/priceController.js";

const router = express.Router();

router.get("/", getPrices);
router.post("/", createPrice);
router.delete("/:id", deletePrice);

export default router;
