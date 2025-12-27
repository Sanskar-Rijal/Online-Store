import express from "express";
import {
  forgotPassword,
  login,
  logout,
  protect,
  signup,
  updatePassword,
} from "../Controller/authController.js";

const router = express.Router();

//for signup
router.post("/signup", signup);

//for login
router.post("/login", login);
//for logout
router.get("/logout", logout);
//for update password
router.post("/updatePassword", protect, updatePassword);
//for forgotPassword
router.post("/forgotPassword", forgotPassword);

export default router;
