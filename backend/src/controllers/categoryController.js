import Category from "../models/Category.js";

const fetchCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    categories.length === 0 &&
      res.status(400).json({ message: "No categories created" });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
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

const updateCategory = async (req, res) => {
  const { name } = req.body;
  try {
    const category = await Category.findById(req.params.id);
    category.name = name;
    const updatedCategory = await category.save();
    res.status(200).json(updateCategory);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const deleteCategory = async (req, res) => {
  console.log(req.params)
  try {
    const category = await Category.findById(req.params.id);
    !category && res.status(400).json({ message: "Category not found" });
    await category.deleteOne();
    res.status(200).res({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export { fetchCategories, createCategory, updateCategory, deleteCategory };
