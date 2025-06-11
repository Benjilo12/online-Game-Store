import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import { useState } from "react";

function GameSwiper({ games }) {
  const featuredGames = games?.filter((game) => game.isFeatured) || [];
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="w-[98%] md:ml-[36px] py-3 bg-black rounded-xl relative group">
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        loop={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 5,
          stretch: -30,
          depth: 100,
          modifier: 1.5,
          slideShadows: false,
        }}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          320: {
            coverflowEffect: {
              rotate: 5,
              stretch: -30,
              depth: 100,
            },
          },
          640: {
            coverflowEffect: {
              rotate: 8,
              stretch: -40,
              depth: 120,
            },
          },
          1024: {
            coverflowEffect: {
              rotate: 10,
              stretch: -50,
              depth: 150,
            },
          },
        }}
        modules={[EffectCoverflow, Autoplay, Navigation]}
        className="w-full h-[300px] sm:h-[350px] md:h-[380px]"
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      >
        {featuredGames.map((game, index) => (
          <SwiperSlide
            key={game._id}
            className={`!w-[280px] !h-[260px] sm:!w-[400px] sm:!h-[320px] md:!w-[550px] md:!h-[350px] lg:!w-[650px] lg:!h-[380px] mx-1 transition-transform duration-300 ${
              activeIndex === index ? "!brightness-100" : "!brightness-80"
            }`}
          >
            <div className="relative w-full h-full bg-center bg-cover p-[8px] sm:p-[10px] overflow-hidden rounded-xl border-2 border-gray-800 hover:border-gray-600 transition-all duration-300">
              <img
                src={game.image}
                alt={game.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div
                className={`absolute inset-0 transition-all duration-300 ${
                  activeIndex !== index ? "bg-black/40" : ""
                }`}
              ></div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-3 sm:p-5">
                <h2 className="text-white text-sm sm:text-lg md:text-xl font-bold">
                  {game.name}
                </h2>
                {game.description && (
                  <p className="text-gray-300 text-[15px] mt-1 line-clamp-2">
                    {game.description}
                  </p>
                )}
                <div className="mt-1 sm:mt-2">
                  <p className="bg-red-700 text-white px-3 py-1 sm:px-4 sm:py-1 rounded-full text-xs sm:text-sm inline-block transition-all duration-300">
                    Coming Soon
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Arrows - Responsive */}
      <div className="swiper-button-prev !hidden sm:!flex !w-8 !h-8 sm:!w-10 sm:!h-10 !rounded-full !bg-white/20 !backdrop-blur-sm after:!text-white after:!text-xs sm:after:!text-sm after:!font-bold hover:!bg-white/30 transition-all duration-300"></div>
      <div className="swiper-button-next !hidden sm:!flex !w-8 !h-8 sm:!w-10 sm:!h-10 !rounded-full !bg-white/20 !backdrop-blur-sm after:!text-white after:!text-xs sm:after:!text-sm after:!font-bold hover:!bg-white/30 transition-all duration-300"></div>
    </div>
  );
}

export default GameSwiper;
