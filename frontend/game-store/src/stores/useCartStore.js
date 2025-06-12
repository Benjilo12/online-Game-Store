import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

export const useCartStore = create((set, get) => ({
  cart: [], // Initialize as empty array
  coupon: null,
  total: 0,
  subtotal: 0,

  getCartItems: async () => {
    try {
      const res = await axios.get("/cart");
      // Ensure we're getting an array and transform data if needed
      const cartItems = Array.isArray(res.data) ? res.data : [];
      set({ cart: cartItems });
      get().calculateTotals();
    } catch (error) {
      set({ cart: [] });
      toast.error(error.response?.data?.message || "An error occurred");
    }
  },

  addToCart: async (product) => {
    try {
      await axios.post("/cart", { productId: product._id });
      toast.success("Product added to cart");

      set((prevState) => {
        const currentCart = Array.isArray(prevState.cart) ? prevState.cart : [];
        const existingItem = currentCart.find(
          (item) => item._id === product._id
        );

        const newCart = existingItem
          ? currentCart.map((item) =>
              item._id === product._id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          : [...currentCart, { ...product, quantity: 1 }];

        return { cart: newCart };
      });
      get().calculateTotals();
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  },

  calculateTotals: () => {
    const { cart = [], coupon } = get(); // Default to empty array
    const subtotal = cart.reduce(
      (sum, item) => sum + (item.price || 0) * (item.quantity || 0),
      0
    );
    let total = subtotal;
    if (coupon) {
      const discount = subtotal * (coupon.discountPercentage / 100);
      total = subtotal - discount;
    }
    set({ subtotal, total }); // Fixed: pass as object
  },
}));
