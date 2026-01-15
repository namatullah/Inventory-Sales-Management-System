const getPrices = async (req, res) => {
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

const createPrice = async (req, res) => {
  const { name, sku, category } = req.body;
  try {
    existProduct &&
      res.status(400).json({ message: "This product is already available" });
    await Product.create({
      name,
      sku,
      category: new mongoose.Types.ObjectId(category),
    });
    res.status(200).json({ message: "Product created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};