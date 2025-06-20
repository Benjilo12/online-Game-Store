import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const CustomNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking a link
  const closeMobileMenu = () => setIsOpen(false);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-black/90 py-2 shadow-lg" : "bg-black py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo - Left Side */}
          <Link to="/" className="flex items-center" onClick={closeMobileMenu}>
            <span className="text-2xl font-bold text-white">
              <span className="text-red-500">Rock</span>Gamez
            </span>
          </Link>

          {/* Middle Links - Desktop */}
          <div className="hidden md:flex space-x-8 mx-auto">
            <Link
              to="/"
              className="text-white hover:text-red-500 transition-colors duration-300 font-medium"
              onClick={closeMobileMenu}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-white hover:text-red-500 transition-colors duration-300 font-medium"
              onClick={closeMobileMenu}
            >
              About
            </Link>
          </div>

          {/* Right Side Links - Desktop */}
          <div className="hidden md:flex space-x-6">
            <Link
              to="/login"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md transition-colors duration-300 font-medium"
              onClick={closeMobileMenu}
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors duration-300 font-medium"
              onClick={closeMobileMenu}
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden ${
            isOpen ? "block" : "hidden"
          } transition-all duration-300 ease-in-out`}
        >
          <div className="pt-4 pb-6 space-y-4">
            <Link
              to="/"
              className="block text-white hover:text-red-500 px-3 py-2 rounded-md text-base font-medium"
              onClick={closeMobileMenu}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="block text-white hover:text-red-500 px-3 py-2 rounded-md text-base font-medium"
              onClick={closeMobileMenu}
            >
              About
            </Link>
            <div className="border-t border-gray-700 pt-4">
              <Link
                to="/login"
                className="block text-white bg-emerald-500 hover:text-gray-50 px-3 py-2 rounded-md text-base font-medium"
                onClick={closeMobileMenu}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="block bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md text-base font-medium mt-2"
                onClick={closeMobileMenu}
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default CustomNavbar;
