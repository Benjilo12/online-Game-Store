import Gamecard from "./Gamecard";

import { useProductStore } from "../stores/useProductStore";
import { useEffect, useState } from "react";
import GamecardSkeleton from "./GamecardSkeleton";

function GameDetails() {
  const [displayedGames, setDisplayedGames] = useState([]);
  const { products, loading, fetchAllProducts } = useProductStore();

  // Number of items to display
  const MAX_ITEMS = 12;

  useEffect(() => {
    fetchAllProducts();
  }, []);

  useEffect(() => {
    if (Array.isArray(products) && products.length > 0) {
      setDisplayedGames(products.slice(0, MAX_ITEMS));
    } else {
      setDisplayedGames([]);
    }
  }, [products]);

  return (
    <div className="p-6">
      {loading ? (
        // ✅ Show skeletons while loading
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(MAX_ITEMS)].map((_, idx) => (
            <GamecardSkeleton key={idx} />
          ))}
        </div>
      ) : displayedGames.length === 0 ? (
        <div className="text-center text-gray-500 text-lg">
          No games available
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayedGames.map((game) => (
            <Gamecard
              key={game.id || game._id}
              image={game.image}
              name={game.name}
              price={game.price}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default GameDetails;
