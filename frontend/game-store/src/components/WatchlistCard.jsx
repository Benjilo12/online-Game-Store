import { Heart, ShoppingBag, X } from "lucide-react";

import toast from "react-hot-toast";

import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";
import { useWatchlistStore } from "../stores/useWatchlistStore";

function WatchlistCard({ game }) {
  const { user } = useUserStore();
  const { addToCart } = useCartStore();
  const { removeFromWatchlist } = useWatchlistStore();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (!user) {
      toast.error("Please login to add products to cart");
      return;
    }
    addToCart(game);
    toast.success(`${game.name} added to cart`);
  };

  const handleRemoveFromWatchlist = (e) => {
    e.stopPropagation();
    removeFromWatchlist(game._id);
    toast.success(`${game.name} removed from watchlist`);
  };

  return (
    <div className="relative group w-full rounded-xl overflow-hidden shadow-lg bg-[#0e1220] text-white transition-all duration-300 hover:shadow-xl hover:translate-y-[-4px]">
      {/* Remove from watchlist button */}
      <button
        onClick={handleRemoveFromWatchlist}
        className="absolute top-2 right-2 p-2 rounded-full bg-red-500/90 hover:bg-red-600 transition-colors duration-200 z-10 cursor-pointer"
        aria-label="Remove from watchlist"
      >
        <X size={16} className="text-white" />
      </button>

      {/* Game Image */}
      <Link to={`/game/${game._id}`} className="block aspect-[3/4]">
        <img
          src={game.image}
          alt={game.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </Link>

      {/* Action Buttons */}
      <div className="absolute bottom-2 right-2 flex space-x-2">
        <button
          className="bg-[#192033] p-2 rounded-full hover:bg-emerald-500 cursor-pointer transition-colors duration-200"
          onClick={handleAddToCart}
          aria-label="Add to cart"
        >
          <ShoppingBag size={16} className="text-white" />
        </button>
      </div>

      {/* Game Info */}
      <div className="p-4">
        <Link to={`/game/${game._id}`}>
          <h3 className="text-sm font-semibold leading-tight hover:text-emerald-400 transition-colors duration-200 line-clamp-1">
            {game.name}
          </h3>
        </Link>
        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center space-x-2">
            {game.discount > 0 && (
              <span className="text-xs line-through text-gray-400">
                ${game.originalPrice}
              </span>
            )}
            <span className="text-sm text-emerald-300">${game.price}</span>
          </div>
          {game.discount > 0 && (
            <span className="text-xs bg-red-500 text-white px-2 py-1 rounded">
              -{game.discount}%
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default WatchlistCard;
