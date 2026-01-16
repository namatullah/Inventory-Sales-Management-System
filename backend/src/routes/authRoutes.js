import express from "express";
import { me, signin, signup } from "../controllers/authController.js";

const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.get("/me", me);

export default router;
