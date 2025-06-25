import Marquee from "react-fast-marquee";
import logo1 from "./images/logo1.jpg";
import logo2 from "./images/logo2.webp";
import logo3 from "./images/logo3.webp";
import logo4 from "./images/logo4.jpg";
import logo5 from "./images/logo5.webp";
import logo6 from "./images/logo6.webp";
import logo7 from "./images/logo7.webp";
import logo8 from "./images/logo8.webp";
import logo9 from "./images/logo9.jpg";

const BrandCarousel = () => {
  const brands = [
    logo1,
    logo2,
    logo3,
    logo4,
    logo5,
    logo6,
    logo7,
    logo8,
    logo9,
  ];

  return (
    <section className="h-[40vh] bg-white py-5 flex flex-col mt-0">
      <h2 className="text-center mb-5 text-5xl text-gray-950 font-semibold">
        Trusted By
      </h2>
      <div className="flex-1 flex items-center">
        <Marquee
          speed={70}
          autoFill={true}
          pauseOnHover={true}
          className="py-1"
        >
          {brands.map((logo, index) => (
            <div
              key={index}
              className="mx-4 flex items-center"
              style={{ width: "150px", height: "80px" }}
            >
              <img
                src={logo}
                alt={`Brand ${index + 1}`}
                className="w-full h-full object-contain"
              />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default BrandCarousel;
