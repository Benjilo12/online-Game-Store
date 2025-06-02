import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import e from "express";
// Middleware to protect routes by verifying access tokens
export const protectRoute = async (req, res, next) => {
  try {
    // Check if the access token is provided in cookies
    const accessToken = req.cookies.access_token;

    // If no access token is found, return an unauthorized response
    if (!accessToken) {
      return res.status(401).json({ message: "Unathorized - Admins only" });
    }

    try {
      // Verify the access token
      // If the token is invalid or expired, it will throw an error
      const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
      const user = await User.findById(decoded.userId).select("-password");

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      req.user = user; // Attach user to request object
      next(); // Proceed to the next middleware or route handler
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token expired" });
      }
      throw error; // Rethrow other errors for handling in the catch block
    }
  } catch (error) {
    console.error("Error in protectRoute middleware:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const adminRoute = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next(); // If user is admin, proceed to the next middleware or route handler
  } else {
    res.status(403).json({ message: "Forbidden - Admins only" }); // If not admin, return forbidden response
  }
};
