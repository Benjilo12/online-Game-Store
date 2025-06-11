import { useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import { useProductStore } from "../stores/useProductStore";
import ActCard from "../components/ActCard";
import Adventurecard from "../components/Adventurecard";
import SportsCard from "../components/SportsCard";

function Category() {
  const { products, loading } = useProductStore();
  const [searchTerm, setSearchTerm] = useState("");

  // Filter products based on search term
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <DashboardLayout>
      {/* upper part */}
      <div className="">
        <div className="relative h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] bg-[url('/uncharted.jpg')] bg-cover bg-bottom text-white">
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/60" />

          {/* Content */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 flex flex-col md:flex-row justify-between items-center h-full">
            {/* Left Text Content */}
            <div className="max-w-xl">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
                The Sims 4
              </h1>
              <p className="text-gray-300 text-sm sm:text-base mb-4 sm:mb-6">
                Grab an Expansion, Game, and Stuff Pack for a discounted price
                on all 3.
              </p>
            </div>
          </div>

          {/* Top Search Bar and Icons */}
          <div className="absolute top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6 flex justify-between items-center">
            <div className="flex-1 mx-2 sm:mx-4">
              <input
                type="text"
                placeholder="Search games and add-ons"
                className="w-full max-w-md px-3 sm:px-4 py-1 sm:py-2 rounded-md bg-white text-black focus:outline-none text-sm sm:text-base"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="mt-25">
          <ActCard filteredProducts={filteredProducts} />
        </div>
        <div className="mt-20">
          <Adventurecard filteredProducts={filteredProducts} />
        </div>
        <div className="mt-20">
          <SportsCard filteredProducts={filteredProducts} />
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Category;
