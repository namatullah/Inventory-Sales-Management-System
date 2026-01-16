import express from "express";
import {
  addToStock,
  createProduct,
  deleteProduct,
  fetchProducts,
  getProductById,
  getStock,
  updateProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/", fetchProducts);
router.get("/:id", getProductById);
router.get("/:id/get_stock", getStock);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.put("/:id/add_to_stock", addToStock);
router.delete("/:id", deleteProduct);

export default router;
