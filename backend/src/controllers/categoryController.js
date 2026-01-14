import Category from "../models/Category.js";

const createCategory = async (req, res) => {
  const { name } = req.body;
  try {
    const existCategory = await Category.findOne({ name });
    existCategory &&
      res.status(400).json({ message: "Category already exists" });

    const category = await Category.create({ name });

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
const updateCategory = (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
const deleteCategory = (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export { createCategory, updateCategory, deleteCategory };
