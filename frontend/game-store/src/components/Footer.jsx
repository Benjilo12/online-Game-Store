import {
  Mail,
  Phone,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Twitch,
  MessagesSquare,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-12 pb-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[90rem] mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div className="col-span-1 lg:col-span-2">
            <h3 className="text-2xl font-bold text-red-500 mb-4">
              Rock<span className="text-gray-50">Gamez</span>
            </h3>
            <p className="text-gray-300 mb-4">
              Your ultimate destination for gaming news, reviews, and community.
              We bring you the latest in the gaming world with passion and
              expertise.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <Twitch className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <MessagesSquare className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 border-b border-red-500 pb-2">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-red-500 transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-red-500 transition-colors"
                >
                  Games
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-red-500 transition-colors"
                >
                  Reviews
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-red-500 transition-colors"
                >
                  News
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-red-500 transition-colors"
                >
                  Forums
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 border-b border-red-500 pb-2">
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center">
                <Mail className="text-red-500 mr-2 w-5 h-5" />
                <span className="text-gray-300">contact@rockgamez.com</span>
              </li>
              <li className="flex items-center">
                <Phone className="text-red-500 mr-2 w-5 h-5" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h4 className="text-lg font-semibold mb-2">
                Subscribe to our Newsletter
              </h4>
              <p className="text-gray-300">
                Get the latest gaming news delivered to your inbox
              </p>
            </div>
            <div className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-2 rounded-l-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500 w-full"
              />
              <button className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-r-lg font-medium transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 mb-4 md:mb-0">
            © {new Date().getFullYear()} RockGamez. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
