import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

export const useUserStore = create((set) => ({
  user: null,
  loading: false,
  checkingAuth: true,

  // Fetch user data
  signup: async ({ name, email, password, confirmPassword }) => {
    set({ loading: true });

    // Validate input
    if (password !== confirmPassword) {
      set({ loading: false });
      return toast.error("Passwords do not match");
    }

    // Perform signup request
    try {
      const res = await axios.post("/auth/signup", {
        name,
        email,
        password,
      });
      set({ user: res.data, loading: false });
    } catch (error) {
      set({ loading: false });
      if (error.response && error.response.data) {
        toast.error(error.response.data.message || "Signup failed");
      } else {
        toast.error("An error occurred during signup");
      }
    }
  },
  login: async (email, password) => {
    set({ loading: true });

    // Perform signup request
    try {
      const res = await axios.post("/auth/login", {
        email,
        password,
      });
      set({ user: res.data, loading: false });
    } catch (error) {
      set({ loading: false });
      set({ loading: false });
      toast.error(error.response.data.message || "An error occurred");
    }
  },

  checkAuth: async () => {
    set({ checkingAuth: true });
    try {
      const response = await axios.get("/auth/profile");
      set({ user: response.data, checkingAuth: false });
    } catch (error) {
      set({ checkingAuth: false, user: null });
    }
  },
}));
