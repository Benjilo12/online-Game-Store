import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

export const useCartStore = create((set, get) => ({
  cart: [],

  total: 0,
  subtotal: 0,
  loading: false,

  // Get all cart items
  getCartItems: async () => {
    set({ loading: true });
    try {
      const res = await axios.get("/cart");
      set({
        cart: res.data,
        loading: false,
      });
      get().calculateTotals();
    } catch (error) {
      set({
        cart: [],
        loading: false,
      });
      toast.error(error.response?.data?.message || "Failed to load cart");
    }
  },

  // In your useCartStore (cart.store.js)
  clearCart: async () => {
    set({ loading: true });
    try {
      // Make API call to clear cart on server
      await axios.delete("/cart", { data: { productId: null } }); // Or whatever endpoint clears the entire cart

      // Then clear local state
      set({
        cart: [],
        total: 0,
        subtotal: 0,
        loading: false,
      });
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.message || "Failed to clear cart");
    }
  },

  // Add item to cart
  addToCart: async (product) => {
    set({ loading: true });
    try {
      await axios.post("/cart", { productId: product._id });
      set((state) => {
        const existingItem = state.cart.find(
          (item) => item._id === product._id
        );
        const newCart = existingItem
          ? state.cart.map((item) =>
              item._id === product._id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          : [...state.cart, { ...product, quantity: 1 }];

        return {
          cart: newCart,
          loading: false,
        };
      });
      get().calculateTotals();
      toast.success(`${product.name} added to cart`);
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.message || "Failed to add to cart");
    }
  },

  // Remove item from cart (updated with proper error handling)
  removeAllCart: async (productId) => {
    await axios.delete(`/cart`, { data: { productId } });
    set((prevState) => ({
      cart: prevState.cart.filter((item) => item._id !== productId),
    }));
    get().calculateTotals();
  },

  // Update item quantity
  updateQuantity: async (productId, quantity) => {
    if (quantity < 1) return;

    set({ loading: true });
    try {
      await axios.put(`/cart/${productId}`, { quantity });
      set((state) => ({
        cart: state.cart.map((item) =>
          item._id === productId ? { ...item, quantity } : item
        ),
        loading: false,
      }));
      get().calculateTotals();
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.message || "Failed to update quantity");
    }
  },

  // removeAllCart: async (productId) => {
  //   await axios.delete(`/cart`, { data: { productId } });
  //   set((prevState) => ({
  //     cart: prevState.cart.filter((item) => item._id !== productId),
  //   }));
  //   get().calculateTotals();
  // },

  // Calculate cart totals
  calculateTotals: () => {
    const { cart, coupon } = get();
    const subtotal = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    let total = subtotal;

    if (coupon) {
      const discount = subtotal * (coupon.discountPercentage / 100);
      total = subtotal - discount;
    }

    set({ subtotal, total });
  },
}));
