import express from "express";
import { protect, isAdmin } from "../utils/authMiddleware.js";
import {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopRatedProducts
} from "../controllers/productController.js";

const router = express.Router();

// @description : fetch all products
router.get("/", getProducts);
router.get('/top',getTopRatedProducts)
// @description : fetch single product by id
router.get("/:id", getProductById);

// @description : delete product by id
router.delete("/:id", protect, isAdmin, deleteProduct);

// @description : create new product
router.post("/", protect, isAdmin, createProduct);

// @description : update product by id
router.put("/:id", protect, isAdmin, updateProduct);

// @description : create new review for product
router.post("/:id/reviews", protect, createProductReview);



export default router;
