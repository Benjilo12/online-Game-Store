import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  addToWatchList,
  getWatchListProducts,
  removeFromWatchList,
} from "../controllers/watchlist.controller.js";

const router = express.Router();

router.post("/watchlist", protectRoute, addToWatchList);
router.delete("/:id", protectRoute, removeFromWatchList);
router.get("/watchlist", protectRoute, getWatchListProducts);

export default router;
