import Banner from "../components/Banner";
import BrandCarousel from "../components/BrandCarousel";
import CustomNavbar from "../components/CustomNavbar";
import Footer from "../components/Footer";
import GameShowcase from "../components/GameShowcase";
import HeroSection from "../components/HeroSection";

function Homepage() {
  return (
    <div>
      <CustomNavbar />
      <HeroSection />
      <Banner />
      <GameShowcase />
      <BrandCarousel />
      <Footer />
    </div>
  );
}

export default Homepage;
