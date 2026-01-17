import express from "express";
import {
  addToStock,
  createProduct,
  deleteProduct,
  fetchProducts,
  getAgg,
  getProductById,
  getProducts,
  getStock,
  updateProduct,
} from "../controllers/productController.js";

const router = express.Router();
router.get("/agg", getAgg);

router.get("/list", fetchProducts);
router.get("/", getProducts);
router.get("/:id", getProductById);
router.get("/:id/get_stock", getStock);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.put("/:id/add_to_stock", addToStock);
router.delete("/:id", deleteProduct);


export default router;
