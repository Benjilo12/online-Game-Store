import Banner from "../components/Banner";
import CustomNavbar from "../components/CustomNavbar";
import GameShowcase from "../components/GameShowcase";
import HeroSection from "../components/HeroSection";

function Homepage() {
  return (
    <div>
      <CustomNavbar />
      <HeroSection />
      <Banner />
      <GameShowcase />
    </div>
  );
}

export default Homepage;
