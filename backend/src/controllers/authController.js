import User from "../models/User.js";
import { generateToken, verifyToken } from "../utils/jwt.js";
import { generateHash, verifyPassword } from "../utils/password.js";

const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid Email" });
    }
    const passwordMatch = verifyPassword(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid Password" });
    }
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const signup = async (req, res) => {
  const { name, email, password, adminInviteToken } = req.body;
  try {
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({ message: "User already exist" });
    }
    const hashedPassword = await generateHash(password);
    console.log(hashedPassword);
    const role =
      adminInviteToken && adminInviteToken == process.env.ADMIN_INVITE_TOKEN
        ? "admin"
        : "staff";
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
const me = async (req, res) => {
  try {
    const decoded = verifyToken(req.query.token);
    const user = await User.findById(decoded.id).select("-password");
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export { signin, signup, me };
