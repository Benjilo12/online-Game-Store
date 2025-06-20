import { Link } from "react-router-dom";
import { ArrowRight, Gamepad2, Trophy, Users } from "lucide-react";

// Replace with your actual image path
import ghost from "./images/ghost.png";

const HeroSection = () => {
  return (
    <section
      className="relative text-white pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(56, 54, 54, 0.56), rgba(0, 0, 0, 0.7)), url(${ghost})`,
        backgroundSize: "cover",
        backgroundPosition: "top ",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400">
              Ultimate Gaming
            </span>{" "}
            Experience
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8">
            Join millions of players worldwide in the most exciting gaming
            platform. Discover, play, and compete in your favorite games.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2"
            >
              Explore Games <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/signup"
              className="bg-transparent hover:bg-white/10 text-white border border-white/30 px-8 py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2"
            >
              Join Free
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-12 flex flex-wrap justify-center gap-6">
            <div className="flex items-center gap-3">
              <div className="bg-red-500/20 p-3 rounded-full">
                <Gamepad2 className="w-6 h-6 text-emerald-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">500+</p>
                <p className="text-gray-400 text-sm">Games Available</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-blue-500/20 p-3 rounded-full">
                <Users className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">10M+</p>
                <p className="text-gray-400 text-sm">Active Players</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-yellow-500/20 p-3 rounded-full">
                <Trophy className="w-6 h-6 text-yellow-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">50K+</p>
                <p className="text-gray-400 text-sm">Daily Tournaments</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
