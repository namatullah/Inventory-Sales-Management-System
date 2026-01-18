import express from "express";
import {
  createCategory,
  deleteCategory,
  fetchCategories,
  getCategories,
  updateCategory,
} from "../controllers/categoryController.js";
import { adminAuth, protect } from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/",protect, fetchCategories);
router.get("/list", getCategories);
router.post("/", protect, adminAuth, createCategory);
router.put("/:id", protect, adminAuth, updateCategory);
router.delete("/:id", protect, adminAuth, deleteCategory);

export default router;
