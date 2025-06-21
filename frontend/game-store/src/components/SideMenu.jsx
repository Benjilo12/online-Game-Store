import {
  Facebook,
  Gamepad2,
  Grid2x2,
  Heart,
  House,
  Share,
  ShoppingBag,
  Twitch,
  Youtube,
} from "lucide-react";
import { NavLink } from "react-router-dom";

function SideMenu({ activeTab }) {
  return (
    <div
      className={`h-screen flex flex-col transition-all duration-300 ease-in-out bg-gray-900 overflow-hidden rounded 
        ${
          activeTab
            ? "w-[80px] min-w-[80px] px-3 py-6 items-center"
            : "w-[240px] min-w-[240px] px-5 py-8"
        }
        shadow-[5px_0_25px_-5px_rgba(0,0,0,0.5),inset_-1px_0_0_0_rgba(255,255,255,0.1)]`}
    >
      {/* Logo */}
      <NavLink
        to="/game-page"
        className={`flex items-center mb-8 ${
          activeTab ? "justify-center" : "justify-start"
        }`}
      >
        <Gamepad2 size={activeTab ? 32 : 36} className="text-white" />
        {!activeTab && (
          <h1 className="ml-3 font-extrabold text-2xl text-white">
            Rock<span className="text-red-500">Gamez</span>
          </h1>
        )}
      </NavLink>

      {/* Navigation Links */}
      <ul className="flex flex-col gap-2 flex-1">
        {[
          { icon: <House size={24} />, text: "Home", path: "/game-page" },
          {
            icon: <Grid2x2 size={24} />,
            text: "Categories",
            path: "/category",
          },
          { icon: <Heart size={24} />, text: "Watchlist", path: "/watchlist" },
          { icon: <ShoppingBag size={24} />, text: "My Bag", path: "/cart" },
        ].map((item) => (
          <li key={item.text}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex items-center w-full rounded-xl p-3 transition-all duration-200 text-white
                ${activeTab ? "justify-center" : "pl-3"}
                ${
                  isActive
                    ? "bg-red-500/20 border-l-4 border-red-500 font-semibold"
                    : "hover:bg-gray-800/50"
                }`
              }
            >
              <span className={`${activeTab ? "" : "mr-3"}`}>{item.icon}</span>
              {!activeTab && <span className="text-base">{item.text}</span>}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Social Icons */}
      <div
        className={`mt-auto pt-4 ${
          activeTab ? "flex flex-col items-center" : ""
        }`}
      >
        <div className={`flex ${activeTab ? "flex-col gap-3" : "gap-4"}`}>
          {[
            {
              icon: <Facebook size={20} />,
              color: "text-gray-400 hover:text-blue-400",
            },
            {
              icon: <Twitch size={20} />,
              color: "text-gray-400 hover:text-violet-400",
            },
            {
              icon: <Youtube size={20} />,
              color: "text-gray-400 hover:text-red-400",
            },
            {
              icon: <Share size={20} />,
              color: "text-gray-400 hover:text-emerald-400",
            },
          ].map((social, index) => (
            <a
              key={index}
              href="#"
              className={`transition-colors duration-200 ${social.color}`}
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SideMenu;
