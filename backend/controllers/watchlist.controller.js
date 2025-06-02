import Product from "../models/product.model.js";

export const addToWatchList = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = req.user;

    const alreadyInWatchList = user.watchList.find(
      (itemId) => itemId.toString() === productId
    );

    if (alreadyInWatchList) {
      return res.status(400).json({ message: "Product already in watch list" });
    }

    user.watchList.push(productId);
    await user.save();

    res.status(200).json({
      message: "Product added to watch list",
      watchList: user.watchList,
    });
  } catch (error) {
    console.error("Error adding to watch list:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//
export const getWatchListProducts = async (req, res) => {
  try {
    const products = await Product.find({ _id: { $in: req.user.watchList } });
    res.json(products);
  } catch (error) {
    console.log("Error in getWatchListProducts:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const removeFromWatchList = async (req, res) => {
  try {
    const { productId } = req.params;
    const user = req.user;

    user.watchList = user.watchList.filter(
      (itemId) => itemId.toString() !== productId
    );
    await user.save();

    res.json({
      message: "Product removed from watch list",
      watchList: user.watchList,
    });
  } catch (error) {
    console.error("Error removing from watch list:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
