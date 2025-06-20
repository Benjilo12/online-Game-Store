import { Heart, Lock, LogOut, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

function Navbar() {
  const user = true; // Replace with actual user state management
  const isAdmin = true; // Replace with actual admin state management

  return (
    <header className="fixed top-0 left-0 w-full bg-gray-800 bg-opacity-90 backdrop-blur-md z-40 shadow-lg transition-all duration-300 border-b border-gray-700">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-bold items-center space-x-2 flex "
        >
          Rock <span className="text-red-500 ml-1 font-extrabold">Gamez</span>
        </Link>

        {user && (
          <nav className="flex flex-wrap items-center gap-4">
            {/* Cart */}
            <Link className="relative group p-[2px] rounded transition duration-300 ease-in-out">
              <ShoppingCart
                className="inline-block mr-1 group-hover:text-emerald-400"
                size={20}
              />
              <span className="absolute -top-3 -right-2 bg-green-400 text-white rounded-full px-2 py-0.5 text-xs group-hover:bg-green-300 transition duration-300 ease-in-out">
                3
              </span>
            </Link>

            {/* Wishlist */}
            <Link className="relative group p-[2px] rounded">
              <Heart
                className="inline-block mr-1 group-hover:text-pink-400 transition duration-300 ease-in-out"
                size={20}
              />
              <span className="absolute -top-3 -right-2 bg-pink-500 text-white rounded-full px-2 py-0.5 text-xs group-hover:bg-pink-700 transition duration-300 ease-in-out">
                3
              </span>
            </Link>

            {/* Admin Dashboard */}
            {isAdmin && (
              <Link
                to="/secret-dashboard"
                className="bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded-md font-medium transition duration-300 ease-in-out flex items-center"
              >
                <Lock className="inline-block mr-1" size={18} />
                <span className="hidden sm:inline font-bold">Dashboard</span>
              </Link>
            )}

            {/* Log Out button */}
            <button className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md flex items-center transition duration-300 ease-in-out cursor-pointer">
              <LogOut size={18} className="cursor-pointer" />
              <span className="hidden sm:inline ml-2 font-bold">Log Out</span>
            </button>
          </nav>
        )}

        {!user && (
          <Link
            to="/login"
            className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md flex items-center transition duration-300 ease-in-out cursor-pointer"
          >
            <LogOut size={18} className="mr-2" />
            <span className="hidden sm:inline font-bold">Log In</span>
          </Link>
        )}
      </div>
    </header>
  );
}

export default Navbar;
