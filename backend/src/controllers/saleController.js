import mongoose from "mongoose";
import Sale from "../models/Sale.js";
import Product from "../models/Product.js";

const getSales = async (req, res) => {
  const { limit, page } = req.query;
  try {
    const limitNum = parseInt(limit, 10);
    const pageNum = parseInt(page, 10);
    const skip = (pageNum - 1) * limitNum;

    const sales = await Sale.find()
      .populate("soldBy", "name email") // user info
      .populate({
        path: "items.productId",
        select: "name sku stockUnit",
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);
    const total = await Sale.countDocuments();
    if (sales.length === 0) {
      return res.status(400).json({ message: "No sales found" });
    }
    res.status(200).json({ data: sales, total });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
const createSales = async (req, res) => {
  const { rows, userId } = req.body;
  try {
    const items = rows.map((row) => ({
      productId: new mongoose.Types.ObjectId(row.productId),
      quantity: Number(row.quantity),
      priceAtSale: Number(row.price),
    }));
    // check and decrease stock
    for (const item of items) {
      const result = await Product.updateOne(
        {
          _id: item.productId,
          stock: { $gte: item.quantity },
        },
        {
          $inc: { stock: -item.quantity },
        }
      );
      if (result.modifiedCount === 0) {
        return res.status(400).json({ message: "Insufficient stock" });
      }
    }

    const sale = new Sale({
      soldBy: new mongoose.Types.ObjectId(userId),
      items,
    });
    await sale.save();
    res.status(200).json({ message: "Sales added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export { getSales, createSales };
