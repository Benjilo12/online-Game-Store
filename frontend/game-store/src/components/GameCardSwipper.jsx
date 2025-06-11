import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ShoppingCart, Heart } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";

export default function GamecardSwipper({ game }) {
  const getImages = () => {
    if (Array.isArray(game?.images) && game.images.length > 0) {
      return game.images;
    }
    if (game?.image) {
      return [game.image];
    }
    return ["/placeholder-image.jpg"];
  };

  const images = getImages();

  return (
    <div className="relative group w-full max-w-xs rounded-xl overflow-hidden shadow-lg bg-[#0e1220] text-white m-auto">
      {/* Swiper */}
      <Swiper
        modules={[Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        className="w-full h-64 relative"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <img
              src={img}
              alt={`${game?.name || "Game"} ${index + 1}`}
              className="w-full h-64 object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/placeholder-image.jpg";
                e.target.className = "w-full h-full object-contain p-4";
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Title and Price */}
      <div className="p-3">
        <h3 className="text-sm font-medium">{game?.name}</h3>
        <p className="text-sm text-emerald-400">Price: ${game?.price}</p>
      </div>

      {/* Hover Icons */}
      <div className="absolute bottom-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
        <button className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-full cursor-pointer">
          <Heart size={18} />
        </button>
        <button className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-full cursor-pointer">
          <ShoppingCart size={18} />
        </button>
      </div>
    </div>
  );
}
