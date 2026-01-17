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
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);
    const total = await Product.countDocuments();
    if (products.length === 0) {
      return res.status(400).json({ message: "No Product found" });
    }
    res.status(200).json({ data: products, total });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
const getProducts = async (req, res) => {
  try {
    const products = await Product.aggregate([
      {
        $lookup: {
          from: "prices",
          let: { productId: "$_id" },
          pipeline: [
            {
              $match: { $expr: { $eq: ["$product", "$$productId"] } },
            },
            { $sort: { createdAt: -1 } },
            {
              $limit: 1,
            },
          ],
          as: "latestPrice",
        },
      },
      {
        $unwind: { path: "$latestPrice", preserveNullAndEmptyArrays: true },
      },
      { $sort: { createdAt: -1 } },
      {
        $project: {
          name: 1,
          sku: 1,
          stock: 1,
          stockUnit: 1,
          price: "$latestPrice.price",
        },
      },
    ]);
    if (products.length === 0) {
      return res.status(400).json({ message: "No Product found" });
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById({ _id: req.params.id }).populate(
      "category"
    );
    if (!product) {
      return res.status(400).json({ message: "Product is not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const createProduct = async (req, res) => {
  const { name, sku, stock, stockUnit, category } = req.body;
  try {
    const existProduct = await Product.findOne({ sku: sku });
    if (existProduct) {
      return res
        .status(400)
        .json({ message: "This product is already available" });
    }
    await Product.create({
      name,
      sku,
      stock: parseInt(stock, 10),
      stockUnit,
      category: new mongoose.Types.ObjectId(category),
    });
    res.status(200).json({ message: "Product created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
const updateProduct = async (req, res) => {
  const { name, sku, category } = req.body;
  try {
    const product = await Product.findById({ _id: req.params.id });
    product.name = name;
    product.sku = sku;
    product.category = new mongoose.Types.ObjectId(category);
    product.save();
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
const addToStock = async (req, res) => {
  const { stock, stockUnit } = req.body;
  try {
    const product = await Product.findById({ _id: req.params.id });
    product.stock = product.stock + parseInt(stock, 10);
    product.stockUnit = stockUnit;
    product.save();
    res.status(200).json({
      message: "Product quantity added to stock successfully",
      data: product,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
const getStock = async (req, res) => {
  try {
    const product = await Product.findById({ _id: req.params.id });
    if (!product) {
      return res.status(400).json({ message: "Product is not found" });
    }
    res
      .status(200)
      .json({ stock: product.stock, stockUnit: product.stockUnit });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
const getAgg = async (req, res) => {
  try {
  const orders = mongoose.connection.db.collection("orders");

    const data = await orders.aggregate([
      {
        $lookup: {
          from: "warehouses",
          localField: "item",
          foreignField: "stock_item",
          let: { order_qty: "$ordered" },
          pipeline: [
            { $match: { $expr: { $gte: ["$instock", "$$order_qty"] } } },
            { $project: { stock_item: 0, _id: 0 } },
          ],
          as: "stockdata",
        },
      },
    ]);

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  fetchProducts,
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  addToStock,
  getStock,
  getAgg,
};
