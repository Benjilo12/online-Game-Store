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
      className={`h-screen rounded-[30px] flex flex-col transition-all duration-500 border border-black/10 shadow-[0_20px_50px_rgba(0,0,0,0.2)] bg-gray-900 overflow-hidden ${
        activeTab
          ? "w-[70px] min-w-[70px] p-4 items-center"
          : "w-[18%] min-w-[200px] p-[20px] md:p-[30px]"
      }`}
    >
      {/* Logo - Always show icon, only show text when expanded */}
      <NavLink
        to="/game-page"
        className="flex items-center justify-center mb-5"
      >
        <Gamepad2
          size={activeTab ? 36 : 40}
          className={`text-white ${activeTab ? "" : "mr-2"}`}
        />
        <h1
          className={`font-extrabold tracking-[1px] text-white transition-all ${
            activeTab ? "hidden" : "text-xl md:text-2xl lg:text-[2.1em]"
          }`}
        >
          Rock<span className="text-red-500">Gamez</span>
        </h1>
      </NavLink>

      {/* Navigation Links */}
      <ul
        className={`mt-[15px] flex flex-col gap-3 ${
          activeTab ? "items-center" : ""
        }`}
      >
        {[
          { icon: <House size={28} />, text: "Home", path: "/game-page" },
          {
            icon: <Grid2x2 size={28} />,
            text: "Categories",
            path: "/categories",
          },
          { icon: <Heart size={28} />, text: "Watchlist", path: "/watchlist" },
          { icon: <ShoppingBag size={28} />, text: "My Bag", path: "/my-bag" },
        ].map((item) => (
          <li key={item.text}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex gap-4 items-center w-full tracking-[1px] rounded-[20px] mb-3 p-2 transition-all duration-300 text-white ${
                  activeTab ? "justify-center px-3" : ""
                } ${
                  isActive ? "bg-red-100/10 font-bold " : "hover:bg-red-100/10"
                }`
              }
            >
              {item.icon}
              <span
                className={`transition-all ${
                  activeTab ? "hidden" : "text-base md:text-lg lg:text-[1.3em]"
                }`}
              >
                {item.text}
              </span>
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Social Icons - Column when shrunk */}
      <ul
        className={`mt-auto flex transition-all duration-300 ${
          activeTab
            ? "flex-col items-center gap-4"
            : "gap-[15px] md:gap-[20px] justify-center md:justify-start"
        }`}
      >
        {[
          { icon: <Facebook size={24} />, color: "hover:text-blue-400" },
          { icon: <Twitch size={24} />, color: "hover:text-violet-400" },
          { icon: <Youtube size={24} />, color: "hover:text-red-400" },
          { icon: <Share size={24} />, color: "hover:text-emerald-400" },
        ].map((social, index) => (
          <li key={index}>
            <a href="#" className={`transition-colors ${social.color}`}>
              {social.icon}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SideMenu;
