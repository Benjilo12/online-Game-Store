import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

export const useUserStore = create((set, get) => ({
  user: null,
  loading: false,
  checkingAuth: true,
  error: null,

  signup: async ({ name, email, password, confirmPassword }) => {
    set({ loading: true, error: null });

    if (password !== confirmPassword) {
      set({ loading: false });
      return toast.error("Passwords don't match");
    }

    try {
      const res = await axios.post("/auth/signup", { name, email, password });
      set({ user: res.data.user, loading: false });
      toast.success("Account created successfully!");
      return res.data;
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Signup failed";
      set({ loading: false, error: errorMsg });
      toast.error(errorMsg);
      throw error;
    }
  },

  login: async (email, password) => {
    set({ loading: true, error: null });

    try {
      const res = await axios.post("/auth/login", { email, password });
      set({ user: res.data, loading: false });
      toast.success("Logged in successfully!");
      return res.data;
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Login failed";
      set({ loading: false, error: errorMsg });
      toast.error(errorMsg);
      throw error;
    }
  },

  logout: async () => {
    try {
      // Clear the access token from cookies first
      document.cookie =
        "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      // Then make the API call to logout
      await axios.post("/auth/logout");

      // Clear user state
      set({ user: null });
      toast.success("Logged out successfully");
    } catch (error) {
      // Even if the API call fails, we should still clear the user state
      const errorMsg = error.response?.data?.message || "Logout failed";
      set({ user: null, error: errorMsg });
      toast.error(errorMsg);
    }
  },

  checkAuth: async () => {
    set({ checkingAuth: true, error: null });
    try {
      const response = await axios.get("/auth/profile");
      set({ user: response.data, checkingAuth: false });
      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        try {
          await get().refreshToken();
          const retryResponse = await axios.get("/auth/profile");
          set({ user: retryResponse.data, checkingAuth: false });
          return retryResponse.data;
        } catch (refreshError) {
          set({ user: null, checkingAuth: false });
          throw refreshError;
        }
      }
      set({ user: null, checkingAuth: false });
      throw error;
    }
  },

  refreshToken: async () => {
    if (get().checkingAuth) return;
    set({ checkingAuth: true, error: null });
    try {
      const response = await axios.post("/auth/refresh-token");
      set({ checkingAuth: false });
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Token refresh failed";
      set({ user: null, checkingAuth: false, error: errorMsg });
      throw error;
    }
  },
}));

// Axios interceptor setup
let refreshPromise = null;

axios.interceptors.request.use((config) => {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("accessToken="))
    ?.split("=")[1];
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        if (refreshPromise) {
          await refreshPromise;
          return axios(originalRequest);
        }

        refreshPromise = useUserStore.getState().refreshToken();
        await refreshPromise;
        refreshPromise = null;

        return axios(originalRequest);
      } catch (refreshError) {
        // Clear the token from cookies on refresh error
        document.cookie =
          "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        useUserStore.getState().logout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
