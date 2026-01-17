import mongoose from "mongoose";
const ItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: { type: Number, required: true, min: 1 },
    priceAtSale: { type: Number, required: true, min: 0 },
  },
  {
    _id: false,
  }
);
const SaleSchema = new mongoose.Schema(
  {
    soldBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: {
      type: [ItemSchema],
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);
SaleSchema.pre("validate", function () {
  this.totalAmount = this.items.reduce(
    (sum, item) => sum + item.quantity * item.priceAtSale,
    0
  );
});

export default mongoose.model("Sale", SaleSchema);
