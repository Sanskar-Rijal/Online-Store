import { Router } from "express";
import { protect, restrictTo } from "../Controller/authController.js";
import {
  createReview,
  deleteReview,
  getAllReviews,
} from "../Controller/reviewController.js";

const router = Router();

router.post("/createReview", protect, restrictTo("user"), createReview);
router.delete("/deleteReview/:id", protect, deleteReview);
router.route("/").get(protect, getAllReviews);

export default router;
