import { Router } from "express";
import {
  createNewProduct,
  deleteProductById,
  getProductById,
  getProducts,
  searchProductByName,
  updateProductById,
} from "../Controller/productController.js";

const router = Router();

router.route("/").get(getProducts).post(createNewProduct);

//search product by name
router.route("/search").get(searchProductByName);

//find by id route
router
  .route("/:id")
  .get(getProductById)
  .put(updateProductById)
  .delete(deleteProductById);

export default router;
