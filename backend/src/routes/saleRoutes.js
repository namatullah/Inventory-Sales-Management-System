import express from "express";
import { createSales, getSales } from "../controllers/saleController.js";

const router = express.Router();

router.get("/", getSales);
router.post("/", createSales);
// router.delete("/:id", deleteUser);

export default router;
