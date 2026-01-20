import express from "express";
import {
  changePassword,
  me,
  signin,
  signup,
  updateProfile,
  verifiyingEmail,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.get("/me", me);
router.put("/:id/update_profile", updateProfile);
router.put("/:id/change_password", changePassword);
router.get("/verifiying_email", verifiyingEmail);

export default router;
