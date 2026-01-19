import express from "express";
import {
  changePassword,
  me,
  signin,
  signup,
  updateProfile,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.get("/me", me);
router.put("/:id/update_profile", updateProfile);
router.put("/:id/change_password", changePassword);

export default router;
