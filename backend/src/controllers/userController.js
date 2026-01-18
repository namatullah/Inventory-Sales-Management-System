import User from "../models/User.js";

const getUsers = async (req, res) => {
  const { limit = 10, page = 1 } = req.query;
  const limitNum = parseInt(limit, 10);
  const pageNum = parseInt(page, 10);
  const skip = (pageNum - 1) * limitNum;
  const user = req.user;

  try {
    const users = await User.find({ _id: { $ne: user._id } })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    if (users.length === 0) {
      return res.status(404).json({ message: "Users not found" });
    }

    const total = await User.countDocuments({ _id: { $ne: user._id } });

    res.status(200).json({ data: users, total });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export { getUsers, deleteUser };
