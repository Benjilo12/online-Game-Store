import { redis } from "../lib/redis.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

//* Function to generate access and refresh tokens
const generateToken = (userId) => {
  const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken };
};

//* Store the refresh token in Redis with an expiration time
const storeRefreshToken = async (userId, refreshToken) => {
  await redis.set(
    `refresh_token:${userId}`,
    refreshToken,
    "EX",
    60 * 60 * 24 * 7
  ); // Store for 7 days
};

//* Function to set cookies for access and refresh tokens
const setCookies = (res, accessToken, refreshToken) => {
  res.cookie("accessToken", accessToken, {
    httpOnly: true, //prevents XSS attcks
    secure: process.env.NODE_ENV === "production", // Use secure cookies in production
    sameSite: "Strict", // Helps prevent CSRF attacks
    maxAge: 15 * 60 * 1000, // 15 minutes
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true, //prevents XSS attcks
    secure: process.env.NODE_ENV === "production", // Use secure cookies in production
    sameSite: "Strict", // Helps prevent CSRF attacks
    maxAge: 7 * 24 * 60 * 60 * 1000, // 15 minutes
  });
};

//! Controller functions for user authentication
export const signup = async (req, res) => {
  try {
    // Validate request body
    const { name, email, password } = req.body;

    //check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create a new user
    const user = new User({ name, email, password });
    await user.save(); // ✅ Save the new user to the database
    console.log("User saved:", user);

    //authentication logic can be added here if needed
    const { accessToken, refreshToken } = generateToken(user._id);
    await storeRefreshToken(user._id, refreshToken); // Store the refresh token in Redis

    // Set cookies for access and refresh tokens
    setCookies(res, "access_token", accessToken);

    // Respond with user details and success message
    res.status(201).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      message: "User created successfully",
    });
  } catch (error) {
    console.log("Error in signup controller:", error.message);
    // Handle errors and respond with an error message
    res.status(500).json({
      message: error.message,
    });
  }
};

//! Controller function for user login
export const login = async (req, res) => {
  try {
    // Validate request body
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.comparePassword(password))) {
      const { accessToken, refreshToken } = generateToken(user._id);
      await storeRefreshToken(user._id, refreshToken); // Store the refresh token in Redis

      setCookies(res, accessToken, refreshToken); // Set cookies for access and refresh tokens

      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.log("Error in login controller:", error.message);
    res.status(500).json({
      message: error.message,
    });
  }
};
//! Controller function for user logout
export const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (refreshToken) {
      const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );
      await redis.del(`refresh_token:${decoded.userId}`); // Remove the refresh token from Redis
    }
    // Clear cookies
    res.clearCookie("accessToken");
    // Clear the refresh token cookie
    res.clearCookie("refreshToken");
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller:", error.message);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Placeholder for refresh token logic
// This function should verify the refresh token, generate new access and refresh tokens, and set them in cookies.
// this will refresh the access token
export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ message: "No refresh token provided" });
    }

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const storedToken = await redis.get(`refresh_token:${decoded.userId}`);

    if (storedToken !== refreshToken) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    const accessToken = jwt.sign(
      { userId: decoded.userId },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    res.json({ message: "Token refreshed successfully" });
  } catch (error) {
    console.log("Error in refreshToken controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//TODO Placeholder for getProfile logic
export const getProfile = async (req, res) => {
  try {
    const user = req.user; // Assuming user is populated in the request by middleware
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      watchList: user.watchList,
      cartItems: user.cartItems,
    });
  } catch (error) {
    console.error("Error fetching user profile:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
