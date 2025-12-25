import express from "express";
import signup from "../Controller/authController.js";

const router = express.Router();

//for signup
router.post("/signup", signup);

export default router;
