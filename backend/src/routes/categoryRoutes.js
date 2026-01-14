import express from "express";
import {
  createCategory,
  deleteCategory,
  fetchCategories,
  updateCategory,
} from "../controllers/categoryController.js";

const router = express.Router();
router.get("/", fetchCategories);
router.post("/", createCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

export default router;
