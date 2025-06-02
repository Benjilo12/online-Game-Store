import Product from "../models/product.model.js";

export const getCartProducts = async (req, res) => {
  try {
    const products = await Product.find({ _id: { $in: req.user.cartItems } });

    const cartItems = products.map((product) => {
      const cartItems = req.user.cartItems.find(
        (cartItem) => cartItem.id === product.id
      );
      return { ...product.toJSON(), quantity: item.quantity };
    });
    res.json(cartItems);
  } catch (error) {
    console.log("Errror in getCartProducts:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//! Import necessary models
export const addToCart = async (req, res) => {
  try {
    // Assuming req.body contains productId and req.user is the authenticated user
    const { productId } = req.body;
    const user = req.user;

    // Validate that productId is provided
    const existingItem = user.cartItems.find((item) => item.id === productId);
    if (existingItem) {
      // If item already exists in cart, increment quantity
      existingItem.quantity += 1;
    } else {
      // If item does not exist, add it to cart
      user.cartItems.push(productId);
    }
    await user.save();
    res.json(user.cartItems);
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//! Function to get all products in the user's cart
export const removeAllCart = async (req, res) => {
  try {
    // Assuming req.body contains productId and req.user is the authenticated user
    const { productId } = req.body;
    const user = req.user;

    // If productId is not provided, clear the entire cart
    if (!productId) {
      user.cartItems = [];
    } else {
      user.cartItems = user.cartItems.filter((item) => item.id !== productId);
    }
    // Save the updated user document
    await user.save();
    res.json(user.cartItems);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//! Function to get all products in the user's cart
export const updateQuantity = async (req, res) => {
  try {
    const { id: productId } = req.params; // Get product ID from request parameters
    const { quantity } = req.body; // Get new quantity from request body
    const user = req.user; // Get the authenticated user

    const existingItem = user.cartItems.find((item) => item.id === productId);

    // If the item exists in the cart, update its quantity
    if (existingItem) {
      if (quantity === 0) {
        user.cartItems = user.cartItems.filter((item) => item.id !== productId);
        await user.save();
        return res.json(user.cartItems);
      }
      existingItem.quantity = quantity; // Update the quantity of the existing item
      await user.save(); // Save the updated user document
      res.json(user.cartItems); // Return the updated cart items
    } else {
      res.status(404).json({ message: "Product not found in cart" });
    }
  } catch (error) {
    console.log("Error in updateQuantity:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
