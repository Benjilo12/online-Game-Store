import {
  SlidersHorizontal,
  Heart,
  Lock,
  LogOut,
  ShoppingCart,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useCartStore } from "../stores/useCartStore";
import { useWatchlistStore } from "../stores/useWatchlistStore";
import { useUserStore } from "../stores/useUserStore";

function Header({ handleToggleActive }) {
  // const user = true; // Replace with actual user state management
  // Replace with actual admin state management

  const { user, logout } = useUserStore();

  const isAdmin = user?.role === "admin";

  // Fix: Add null check and default empty array
  const cart = useCartStore((state) => state.cart) || [];
  const watchlist = useWatchlistStore((state) => state.watchlist) || [];

  return (
    <header className="sticky top-0 z-50 w-full bg-gray-900/80 backdrop-blur-sm px-4 py-3 md:px-6 md:py-4 flex justify-between items-center border-b border-gray-800">
      {/* Menu Toggle Button */}
      <button
        onClick={handleToggleActive}
        className="p-2 rounded-full hover:bg-gray-800 transition-colors duration-200"
        aria-label="Toggle menu"
      >
        <SlidersHorizontal className="h-5 w-5 md:h-6 md:w-6" />
      </button>

      {/* Navigation Actions */}
      <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
        {user ? (
          <>
            {/* Cart with Badge - Always visible icon */}
            <Link
              to="/cart"
              className="p-2 relative rounded-full hover:bg-gray-800 transition-colors duration-200"
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="h-5 w-5 md:h-6 md:w-6 text-gray-300 hover:text-emerald-400" />
              {/* Fix: Add null check for cart.length */}
              <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cart?.length || 0}
              </span>
            </Link>

            {/* Rest of your existing code remains exactly the same */}
            {/* Wishlist with Badge - Always visible icon */}
            <Link
              to="/watchlist"
              className="p-2 relative rounded-full hover:bg-gray-800 transition-colors duration-200"
              aria-label="Wishlist"
            >
              <Heart className="h-5 w-5 md:h-6 md:w-6 text-gray-300 hover:text-pink-400" />
              <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {" "}
                {watchlist?.length || 0}
              </span>
            </Link>

            {/* Admin Dashboard - Text hidden on mobile */}
            {isAdmin && (
              <Link
                to="/secret-dashboard"
                className="hidden sm:flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg transition-colors duration-200"
              >
                <Lock className="h-4 w-4 md:h-5 md:w-5" />
                <span className="font-medium text-sm md:text-base">
                  Dashboard
                </span>
              </Link>
            )}

            {/* Log Out - Icon only on mobile */}
            <button
              className="p-2 sm:px-3 sm:py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-white transition-colors duration-200 flex items-center gap-2 cursor-pointer"
              aria-label="Log Out"
              onClick={logout}
            >
              <LogOut className="h-5 w-5 md:h-6 md:w-6" />
              <span className="hidden sm:inline font-medium text-sm md:text-base">
                Log Out
              </span>
            </button>
          </>
        ) : (
          /* Login Button */
          <Link
            to="/login"
            className="px-3 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-white transition-colors duration-200 flex items-center gap-2"
          >
            <LogOut className="h-5 w-5 md:h-6 md:w-6" />
            <span className="font-medium text-sm md:text-base">Log In</span>
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
