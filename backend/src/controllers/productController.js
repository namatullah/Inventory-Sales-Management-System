import mongoose from "mongoose";
import Product from "../models/Product.js";

const fetchProducts = async (req, res) => {
  const { limit, page } = req.query;
  try {
    const limitNum = parseInt(limit, 10);
    const pageNum = parseInt(page, 10);
    const skip = (pageNum - 1) * limitNum;

    const products = await Product.find()
      .populate("category")
      .skip(skip)
      .limit(limitNum);
    const total = await Product.countDocuments();
    products.length === 0 &&
      res.status(400).json({ message: "No Product found" });
    res.status(200).json({ data: products, total });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById({ _id: req.params.id }).populate(
      "category"
    );
    !product && res.status(400).json({ message: "Product is not found" });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const createProduct = async (req, res) => {
  const { name, sku, price, stock, category } = req.body;
  try {
    const existProduct = await Product.findOne({ sku: sku });
    console.log("Pro:", existProduct);
    existProduct &&
      res.status(400).json({ message: "This product is already available" });
    await Product.create({
      name,
      sku,
      stock,
      price,
      category: new mongoose.Types.ObjectId(category),
    });
    res.status(200).json({ message: "Product created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
const updateProduct = async (req, res) => {
  const { name, sku, price, stock, category } = req.body;
  try {
    const product = await Product.findById({ _id: req.params.id });
    product.name = name;
    product.sku = sku;
    product.price = price;
    product.stock = stock;
    (product.category = new mongoose.Types.ObjectId(category)), product.save();
    res.status(200).json({ message: "Product updated successfully" }, product);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export {
  fetchProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
