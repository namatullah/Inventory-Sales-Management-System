import express from "express";
import {
  addToStock,
  createProduct,
  deleteProduct,
  fetchProducts,
  getProductById,
  getProducts,
  getStock,
  updateProduct,
} from "../controllers/productController.js";
import { adminAuth, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/list",protect, fetchProducts);
router.get("/", getProducts);
router.get("/:id",protect, getProductById);
router.get("/:id/get_stock", getStock);
router.post("/",protect,adminAuth, createProduct);
router.put("/:id",protect,adminAuth, updateProduct);
router.put("/:id/add_to_stock",protect,adminAuth, addToStock);
router.delete("/:id",protect,adminAuth, deleteProduct);


export default router;
