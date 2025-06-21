import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "../stores/useProductStore";

const GameShowcase = () => {
  const [activeCategory, setActiveCategory] = useState("sports");
  const [games, setGames] = useState([]);
  const { products, loading, fetchAllProducts } = useProductStore();

  useEffect(() => {
    fetchAllProducts();
  }, []);

  useEffect(() => {
    if (Array.isArray(products) && products.length > 0) {
      setGames(products);
    }
  }, [products]);

  const filteredGames = games.filter(
    (game) => game.category?.toLowerCase() === activeCategory
  );

  return (
    <section className="bg-black py-12 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
            RockGamez {activeCategory === "sports" ? "Sports" : "Adventure"}{" "}
            Titles
          </h2>

          {/* Category Tabs */}
          <div className="flex justify-center gap-3 mb-10">
            <button
              onClick={() => setActiveCategory("sports")}
              className={`px-6 py-2 rounded-lg font-bold text-md transition-colors cursor-pointer ${
                activeCategory === "sports"
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              Sports
            </button>
            <button
              onClick={() => setActiveCategory("adventure")}
              className={`px-6 py-2 rounded-lg font-bold text-md transition-colors cursor-pointer ${
                activeCategory === "adventure"
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              Adventure
            </button>
          </div>
        </div>

        {/* Compact Game Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {filteredGames.map((game) => (
            <div
              key={game.id}
              className="bg-gray-900 rounded-lg overflow-hidden transition-all duration-300 group hover:brightness-125 hover:transform hover:scale-[1.03]"
            >
              {/* Game Image with Reduced Height */}
              <div className="relative aspect-[4/3]">
                {" "}
                {/* Changed from 3/4 to 4/3 for shorter cards */}
                <img
                  src={game.image}
                  alt={game.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                {/* Status Badge */}
                {game.comingSoon && (
                  <div className="absolute top-2 left-2 bg-blue-600/90 px-2 py-1 rounded-full">
                    <span className="text-white text-[0.6rem] font-bold uppercase tracking-wide">
                      Coming Soon
                    </span>
                  </div>
                )}
              </div>

              {/* Compact Game Info */}
              <div className="p-2">
                {" "}
                {/* Reduced padding */}
                <h3 className="text-sm font-bold text-white mb-1 truncate">
                  {game.title}
                </h3>
                <Link
                  to={`/signup`}
                  className="inline-flex items-center text-blue-400 hover:text-blue-300 text-xs font-semibold"
                >
                  {game.comingSoon ? "Learn more" : "Available now"}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 ml-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GameShowcase;
