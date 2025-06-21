import { Link } from "react-router-dom";
import { Gamepad2, ChevronRight } from "lucide-react";

// Replace with your actual image path
import gameImage from "./images/madden.jpg";

const PlayBanner = () => {
  return (
    <section className="bg-white py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Text Content - Left Side */}
          <div className="lg:w-1/2 text-gray-900">
            <div className="flex items-center gap-3 mb-4">
              <Gamepad2 className="w-8 h-8 text-red-500" />
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                PLAY
              </h2>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Unlock a world of thrill
            </h1>

            <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-lg">
              Experience unlimited access to a collection of top RockGamez
              titles, early trials of new releases, and exclusive member
              benefits.
            </p>

            <div className="h-px w-16 bg-red-500 mb-8"></div>

            <Link
              to="/signup"
              className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-md font-medium transition-all duration-300 group"
            >
              Join Now
              <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Image - Right Side */}
          <div className="lg:w-1/2">
            <div className="relative rounded-xl overflow-hidden shadow-2xl h-80 md:h-96 w-full">
              <img
                src={gameImage}
                alt="Featured game"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlayBanner;
