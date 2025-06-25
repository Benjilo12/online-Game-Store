import DashboardLayout from "../layout/DashboardLayout";

import { useWatchlistStore } from "../stores/useWatchlistStore";
import EmptyState from "../components/EmptyState";
import WatchlistCard from "../components/WatchlistCard";

function Watchlist() {
  const { watchlist } = useWatchlistStore();

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Your Watchlist</h1>
          <p className="text-gray-400">
            {watchlist.length} {watchlist.length === 1 ? "item" : "items"}
          </p>
        </div>

        {watchlist.length === 0 ? (
          <EmptyState
            title="Your watchlist is empty"
            description="Games you add to your watchlist will appear here"
            icon="heart"
            actionText="Browse Games"
            actionLink="/game-page"
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {watchlist.map((game) => (
              <WatchlistCard key={game._id} game={game} />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default Watchlist;
