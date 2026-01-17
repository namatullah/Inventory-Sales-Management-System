import express from "express";
import { createSales } from "../controllers/saleController.js";

const router = express.Router();

// router.get("/", getUsers);
router.post("/", createSales);
// router.delete("/:id", deleteUser);

export default router;
