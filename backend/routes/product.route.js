import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getFeaturedProducts,
  getProductsByCategory,
  searchProductsByName,
  toggleFeaturedProduct,
} from "../controllers/product.controller.js";
import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/featured", getFeaturedProducts);
router.get("/category/:category", getProductsByCategory);
router.get("/search", searchProductsByName); // ✅ Add this route
router.post("/", createProduct);
router.patch("/:id", toggleFeaturedProduct);
router.delete("/:id", deleteProduct);

export default router;
