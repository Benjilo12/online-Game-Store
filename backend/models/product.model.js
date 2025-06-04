import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      min: 0,
      required: true,
    },
    image: {
      type: String,
      required: [true, "Image is required"],
    },

    category: {
      type: String,
      required: true,
    },
    platform: {
      type: [String], // array of strings
      required: true,
      enum: ["PC", "PS5", "Xbox", "Nintendo Switch", "PS4", "Mobile"], // optional validation
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
