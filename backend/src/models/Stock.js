import mongoose from "mongoose";

const StockSchema = new mongoose.Schema(
  {
    stock: { type: Number, required: true },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Stock", StockSchema);
