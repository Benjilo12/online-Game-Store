import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import GamecardSwipper from "../components/GameCardSwipper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function SportsCard({ filteredProducts = [] }) {
  // Filter only action games and ensure image fallback is handled
  const actionGames = filteredProducts
    .filter((product) => product?.category?.toLowerCase() === "sports")
    .map((game) => ({
      ...game,
      images:
        Array.isArray(game.images) && game.images.length > 0
          ? game.images
          : game.image
          ? [game.image]
          : ["/placeholder-image.jpg"], // make sure this is in /public
    }));

  return (
    <div className="my-8 relative">
      <h2 className="text-2xl font-bold text-white mb-4">Sports Games</h2>

      {actionGames.length > 0 ? (
        <>
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
            navigation={{
              nextEl: ".custom-next",
              prevEl: ".custom-prev",
            }}
            pagination={{
              clickable: true,
              el: ".custom-pagination",
            }}
            className="w-full"
          >
            {actionGames.map((game) => (
              <SwiperSlide key={game.id || Math.random()}>
                <GamecardSwipper game={game} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation */}
          <div className="custom-pagination flex justify-center mt-4 space-x-2"></div>

          <div className="custom-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all duration-300 cursor-pointer">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </div>

          <div className="custom-next absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all duration-300 cursor-pointer">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </div>
        </>
      ) : (
        <p className="text-gray-400">No action games found</p>
      )}
    </div>
  );
}

export default SportsCard;
