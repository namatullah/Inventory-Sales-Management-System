import express from "express";
import { createSales, getSales } from "../controllers/saleController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getSales);
router.post("/", protect, createSales);
// router.delete("/:id", deleteUser);

export default router;
