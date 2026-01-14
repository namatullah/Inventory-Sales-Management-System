import express from "express";
import {
  createCategory,
  deleteCategory,
  fetchCategories,
  getCategories,
  updateCategory,
} from "../controllers/categoryController.js";

const router = express.Router();
router.get("/", fetchCategories);
router.get("/list", getCategories);
router.post("/", createCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

export default router;
