import Sale from "../models/Sale.js";

const getUserSalesPerQuantity = async (req, res) => {
  try {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;

    const sales = await Sale.aggregate([
      { $unwind: "$items" },
      {
        $match: {
          $expr: {
            $and: [
              { $eq: [{ $year: "$createdAt" }, currentYear] },
              { $eq: [{ $month: "$createdAt" }, currentMonth] },
            ],
          },
        },
      },

      {
        $group: {
          _id: "$soldBy",
          totalItemsSold: { $sum: "$items.quantity" },
        },
      },

      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "seller",
        },
      },

      { $unwind: "$seller" },

      {
        $project: {
          _id: 0,
          sellerId: "$_id",
          sellerName: "$seller.name",
          totalItemsSold: 1,
        },
      },

      { $sort: { totalItemsSold: -1 } },
    ]);

    if (sales.length === 0) {
      return res.status(400).json({ message: "No sales found" });
    }
    res.status(200).json(sales);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getUserSalesPerAmount = async (req, res) => {
  try {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;

    const sales = await Sale.aggregate([
      {
        $match: {
          $expr: {
            $and: [
              { $eq: [{ $year: "$createdAt" }, currentYear] },
              { $eq: [{ $month: "$createdAt" }, currentMonth] },
            ],
          },
        },
      },

      {
        $group: {
          _id: "$soldBy",
          totalAmountSold: { $sum: "$totalAmount" },
        },
      },

      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "seller",
        },
      },
      { $unwind: "$seller" },
      {
        $project: {
          _id: 0,
          sellerId: "$_id",
          sellerName: "$seller.name",
          totalAmount: "$totalAmountSold",
        },
      },
    ]);

    if (sales.length === 0) {
      return res.status(400).json({ message: "No sales found" });
    }
    res.status(200).json(sales);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export { getUserSalesPerQuantity, getUserSalesPerAmount };
