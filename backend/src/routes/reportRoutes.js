import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getUserSalesPerQuantity,
  getUserSalesPerAmount,
} from "../controllers/reportController.js";

const router = express.Router();

router.get("/user_sales_per_quantity", protect, getUserSalesPerQuantity);
router.get("/user_sales_per_amount", protect, getUserSalesPerAmount);

export default router;
