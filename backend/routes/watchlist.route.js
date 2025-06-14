import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  addToWatchList,
  getWatchListProducts,
  removeFromWatchList,
} from "../controllers/watchlist.controller.js";

const router = express.Router();

router.post("/", protectRoute, addToWatchList);
router.delete("/:productId", protectRoute, removeFromWatchList);
router.get("/", protectRoute, getWatchListProducts);

export default router;
