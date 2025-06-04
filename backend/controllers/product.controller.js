import cloudinary from "../lib/cloudinary.js";
import { redis } from "../lib/redis.js";
import Product from "../models/product.model.js";

//! Controller function to get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({}); // find all products
    res.json({ products });
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

//! Controller function to get featured products
export const getFeaturedProducts = async (req, res) => {
  try {
    let featuredProducts = await redis.get("featured_products");
    if (featuredProducts) {
      return res.json(JSON.parse(featuredProducts));
    }

    // if not found in redis, fetch from database
    // .lean() converts the Mongoose document to a plain JavaScript object
    featuredProducts = await Product.find({ isFeatured: true }).lean();

    // Check if featured products exist
    if (!featuredProducts) {
      return res.status(404).json({ message: "No featured products found" });
    }

    //store in redis for future quick access
    await redis.set("featured_products", JSON.stringify(featuredProducts));
    res.json(featuredProducts);
  } catch (error) {
    console.log("Error fetching featured products:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

//! Controller function to create a new product
export const createProduct = async (req, res) => {
  try {
    const { name, price, description, image, platform, category } = req.body;

    let cloudinaryResponse = null;

    if (image) {
      cloudinaryResponse = await cloudinary.uploader.upload(image, {
        folder: "products",
      });
    }

    // If upload fails or no secure_url
    if (!cloudinaryResponse?.secure_url) {
      return res.status(400).json({ message: "Image upload failed" });
    }

    const product = await Product.create({
      name,
      price,
      description,
      image: cloudinaryResponse.secure_url,
      category,
      platform,
    });
    res.status(201).json(product);
  } catch (error) {
    console.log("Error in createProduct controller:", error.message);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

//! Controller function to delete a product
export const deleteProduct = async (req, res) => {
  try {
    // Check if the product exists
    const product = await Product.findById(req.params.id);

    // If product not found, return 404
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // If product has an image, delete it from Cloudinary
    if (product.image) {
      const publicId = product.image.split("/").pop().split(".")[0];

      // Attempt to delete the image from Cloudinary
      try {
        await cloudinary.uploader.destroy(`products/${publicId}`);
        console.log("Image deleted from Cloudinary");
      } catch (error) {
        console.log("Error deleting image from Cloudinary:", error.message);
      }
    }
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log("Error in deleteProduct controller:", error.message);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

//! Controller function to get products by category
export const getProductsByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const products = await Product.find({ category });
    res.json({ products });
  } catch (error) {
    console.log("Error fetching products by category:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

//! Controller function to search products by name
export const searchProductsByName = async (req, res) => {
  try {
    const { name } = req.query;

    // Validate the 'name' query parameter
    if (!name) {
      return res
        .status(400)
        .json({ message: "Search query 'name' is required" });
    }

    // Use a case-insensitive regex to search for products by name
    const regex = new RegExp(name, "i"); // case-insensitive search
    const products = await Product.find({ name: { $regex: regex } });

    // If no products found, return a 404 status
    if (products.length === 0) {
      return res.status(404).json({ message: "No matching products found" });
    }

    res.json({ products });
  } catch (error) {
    console.error("Error searching products:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const toggleFeaturedProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      product.isFeatured = !product.isFeatured; // Toggle the isFeatured status
      const updatedProduct = await product.save();
      await updateFeaturedProductsCache(); // Update the cache after toggling
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error("Error toggling featured product:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

async function updateFeaturedProductsCache() {
  try {
    const featuredProducts = await Product.find({ isFeatured: true }).lean();

    await redis.set("featured_products", JSON.stringify(featuredProducts));
  } catch (error) {
    console.error("Error updating featured products cache:", error.message);
    throw new Error("Failed to update featured products cache");
  }
}
