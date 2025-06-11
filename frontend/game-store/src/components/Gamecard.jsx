import { Heart, ShoppingBag } from "lucide-react";

function Gamecard({ image, name, price }) {
  return (
    <div className="relative group w-64 rounded-xl overflow-hidden shadow-lg bg-[#0e1220] text-white m-auto">
      {/* Game Image */}
      <img
        src={image}
        alt={name}
        className="w-full h-72 object-cover transition-transform duration-300 group-hover:scale-105"
      />

      {/* Hover Icons inside image (bottom-right) */}
      <div className="absolute bottom-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button className="bg-[#192033] p-2 rounded-full hover:bg-red-400 cursor-pointer">
          <Heart size={16} className="text-white hover:text-white" />
        </button>
        <button className="bg-[#192033] p-2 rounded-full hover:bg-emerald-500 cursor-pointer">
          <ShoppingBag size={16} className="text-white" />
        </button>
      </div>

      {/* Game Info */}
      <div className="p-3">
        <h3 className="text-sm font-semibold leading-tight">{name}</h3>
        <p className="text-sm text-emerald-300 mt-1">Price: ${price}</p>
      </div>
    </div>
  );
}

export default Gamecard;
