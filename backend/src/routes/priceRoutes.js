import express from "express";
import { createPrice, deletePrice, getPrices } from "../controllers/priceController.js";
import { adminAuth, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getPrices);
router.post("/",protect,adminAuth, createPrice);
router.delete("/:id",protect,adminAuth, deletePrice);

export default router;
