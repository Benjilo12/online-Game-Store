// cart.controller.js

import Product from "../models/product.model.js";
import User from "../models/user.model.js";

export const getCartProducts = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate(
      "cartItems.product"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const cartItems = user.cartItems.map((item) => ({
      ...item.product.toJSON(),
      quantity: item.quantity,
    }));

    res.json(cartItems);
  } catch (error) {
    console.log("Error in getCartProducts:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const addToCart = async (req, res) => {
  try {
    // Verify user is authenticated
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const { productId } = req.body;
    const userId = req.user._id;

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    // Validate product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Find user and update cart
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if product already in cart
    const existingItemIndex = user.cartItems.findIndex(
      (item) => item.product.toString() === productId
    );

    if (existingItemIndex >= 0) {
      // Increment quantity if already in cart
      user.cartItems[existingItemIndex].quantity += 1;
    } else {
      // Add new item to cart
      user.cartItems.push({
        product: productId,
        quantity: 1,
      });
    }

    await user.save();

    // Return updated cart
    const updatedUser = await User.findById(userId).populate(
      "cartItems.product"
    );
    res.json(updatedUser.cartItems);
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

export const removeAllCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!productId) {
      user.cartItems = [];
    } else {
      user.cartItems = user.cartItems.filter(
        (item) => item.product.toString() !== productId
      );
    }

    await user.save();
    res.json(user.cartItems);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateQuantity = async (req, res) => {
  try {
    const { id: productId } = req.params;
    const { quantity } = req.body;
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const existingItemIndex = user.cartItems.findIndex(
      (item) => item.product.toString() === productId
    );

    if (existingItemIndex >= 0) {
      if (quantity <= 0) {
        // Remove item if quantity is 0 or less
        user.cartItems.splice(existingItemIndex, 1);
      } else {
        // Update quantity
        user.cartItems[existingItemIndex].quantity = quantity;
      }

      await user.save();
      res.json(user.cartItems);
    } else {
      res.status(404).json({ message: "Product not found in cart" });
    }
  } catch (error) {
    console.log("Error in updateQuantity:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
