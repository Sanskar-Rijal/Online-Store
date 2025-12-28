import { Router } from "express";
import {
  createOrder,
  getAllOrdersAdmin,
  getmyOrder,
  getSingleOrder,
  updateOrderStatusAdmin,
} from "../Controller/orderController.js";
import { protect, restrictTo } from "../Controller/authController.js";

const router = Router();

router.post("/createOrder", protect, createOrder);
router.get("/myOrders", protect, getmyOrder);
router.route("/").get(protect, restrictTo("admin"), getAllOrdersAdmin);
router
  .route("/:id")
  .patch(protect, restrictTo("admin"), updateOrderStatusAdmin)
  .get(protect, getSingleOrder);

//Get all orders admin only

export default router;
