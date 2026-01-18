import mongoose from "mongoose";
import Price from "../models/Price.js";

const getPrices = async (req, res) => {
  const { productId } = req.query;
  try {
    const product = await Price.find({ product: productId }).sort({
      createdAt: -1,
    });
    if (!product) {
      return res.status(400).json({ message: "Product is not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const createPrice = async (req, res) => {
  const { price, productId } = req.body;
  try {
    const createdPrice = await Price.create({
      price,
      product: new mongoose.Types.ObjectId(productId),
    });
    res
      .status(200)
      .json({ message: "Price created successfully", data: createdPrice });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
const deletePrice = async (req, res) => {
  try {
    await Price.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json({ message: "Price deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export { createPrice, getPrices, deletePrice };
