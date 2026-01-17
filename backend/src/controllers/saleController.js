import Sale from "../models/Sale.js";
import mongoose from "mongoose";
import Product from "../models/Product.js";

const createSales = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  const { rows, userId } = req.body;
  try {
    const items = rows.map((row) => ({
      productId: new mongoose.Types.ObjectId(row.productId),
      quantity: Number(row.quantity),
      priceAtSale: Number(row.price),
    }));
    // check and decrease stock
    for (const item of items) {
      const product = await Product.findById(item.productId).session(session);
      if (!product) {
        return res.status(400).json({ message: "Product not found" });
      }
      if (product.stock < item.quantity) {
        return res
          .status(400)
          .json({ message: `Insufficient stock for ${product.name}` });
      }
      product.stock -= item.quantity;
      await product.save({ session });
    }

    const sale = new Sale({
      soldBy: new mongoose.Types.ObjectId(userId),
      items,
    });
    await sale.save({ session });
    await session.commitTransaction();
    session.endSession();
    res.status(200).json({ message: "Sales added successfully" });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export { createSales };
