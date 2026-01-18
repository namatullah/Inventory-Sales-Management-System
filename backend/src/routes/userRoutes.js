import express from "express";
import { deleteUser, getUsers } from "../controllers/userController.js";
import { adminAuth, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, adminAuth, getUsers);
router.delete("/:id", protect, adminAuth, deleteUser);

export default router;
