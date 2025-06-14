import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

export const useWatchlistStore = create((set, get) => ({
  watchlist: [],
  loading: false,

  // Add item to watchlist
  addToWatchlist: async (product) => {
    set({ loading: true });
    try {
      await axios.post("/watchlist", { productId: product._id });
      set((state) => {
        const alreadyExists = state.watchlist.some(
          (item) => item._id === product._id
        );

        if (alreadyExists) {
          toast.error("Product already in watchlist");
          return { loading: false };
        }

        return {
          watchlist: [...state.watchlist, product],
          loading: false,
        };
      });
      toast.success(`${product.name} added to watchlist`);
    } catch (error) {
      set({ loading: false });
      console.error("Watchlist error:", error.response?.data); // Add this for debugging
      toast.error(
        error.response?.data?.message || "Failed to add to watchlist"
      );
    }
  },

  // Remove item from watchlist
  removeFromWatchlist: async (productId) => {
    set({ loading: true });
    try {
      await axios.delete(`/watchlist/${productId}`);
      set((state) => ({
        watchlist: state.watchlist.filter((item) => item._id !== productId),
        loading: false,
      }));
      toast.success("Product removed from watchlist");
    } catch (error) {
      set({ loading: false });
      toast.error(
        error.response?.data?.message || "Failed to remove from watchlist"
      );
    }
  },
}));
