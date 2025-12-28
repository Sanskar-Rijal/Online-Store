import { Router } from "express";
import { protect, restrictTo } from "../Controller/authController.js";
import { createReview, deleteReview } from "../Controller/reviewController.js";

const router = Router();

router.post("/createReview", protect, restrictTo("user"), createReview);
router.delete("/deleteReview/:id", protect, deleteReview);

export default router;
