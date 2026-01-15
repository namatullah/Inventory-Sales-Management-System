import mongoose from "mongoose";

const PriceSchema = new mongoose.Schema(
  {
    price: { type: Number, required: true },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Price", PriceSchema);
