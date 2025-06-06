import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "../lib/axios";

export const useProductStore = create((set) => ({
  products: [],
  loading: false,

  setProducts: (products) => set({ products }),

  createProduct: async (productData) => {
    set({ loading: true });
    try {
      //function to create post
      const res = await axios.post("/products", productData);
      console.log(productData);
      set((prevState) => ({
        products: [...prevState.products, res.data],
        loading: false,
      }));
      toast.success("Product created successfully!");
    } catch (error) {
      set({ loading: false });
      toast.error("Failed to create product.");
      console.error("Error creating product:", error);
    }
  },

  //! Fetch all products from the backend
  //! This function will be used to fetch products when the admin page loads
  fetchAllProducts: async () => {
    set({ loading: true });
    try {
      //== Fetch all products from the backend
      //== This assumes your backend has an endpoint to get all products
      const res = await axios.get("/products");
      set({ products: res.data.products, loading: false });
    } catch (error) {
      set({ loading: false });
      toast.error("Failed to fetch products.");
      console.error("Error fetching products:", error);
    }
  },
  deleteProduct: async (productId) => {
    set({ loading: true });
    try {
      // Assuming the backend deletes the product and returns a success message
      // You might want to adjust this based on your backend implementation
      await axios.delete(`/products/${productId}`);
      set((prevState) => ({
        products: prevState.products.filter((p) => p._id !== productId),
        loading: false,
      }));
      toast.success("Product deleted successfully!");
    } catch (error) {
      set({ loading: false });
      toast.error("Failed to delete product.");
      console.error("Error deleting product:", error);
    }
  },

  toggleFeaturedProduct: async (productId) => {
    set({ loading: true });
    try {
      const response = await axios.patch(`/products/${productId}`);
      // this will update the isFeatured prop of the product
      set((prevProducts) => ({
        products: prevProducts.products.map((product) =>
          product._id === productId
            ? { ...product, isFeatured: response.data.isFeatured }
            : product
        ),
        loading: false,
      }));
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.error || "Failed to update product");
    }
  },
}));
