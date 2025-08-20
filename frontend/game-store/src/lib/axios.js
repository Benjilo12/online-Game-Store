import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    import.meta.mode === "development" ? "https://online-game-store-ctqq.onrender.com" : "/api",
  withCredentials: true, // send cookies to the server
});

export default axiosInstance;
