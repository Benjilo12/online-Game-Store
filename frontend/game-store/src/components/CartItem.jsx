import { Minus, Plus, Trash } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";
import { motion } from "framer-motion";

const CartItem = ({ item }) => {
  const { removeAllCart, updateQuantity } = useCartStore();

  return (
    <motion.div
      className="rounded-lg border border-gray-700 bg-gray-800 p-4 shadow-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="shrink-0">
          <img
            className="h-24 w-24 md:h-32 md:w-32 rounded object-cover"
            src={item.image}
            alt={item.name}
          />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-medium text-white truncate">
            {item.name}
          </h3>
          <p className="text-sm text-gray-400 mt-1 line-clamp-2">
            {item.description}
          </p>
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                className="h-8 w-8 rounded-md border border-gray-600 bg-gray-700 hover:bg-gray-600 flex items-center justify-center"
                onClick={() => updateQuantity(item._id, item.quantity - 1)}
              >
                <Minus className="h-4 w-4 text-gray-300 cursor-pointer" />
              </button>
              <span className="w-8 text-center">{item.quantity}</span>
              <button
                className="h-8 w-8 rounded-md border border-gray-600 bg-gray-700 hover:bg-gray-600 flex items-center justify-center"
                onClick={() => updateQuantity(item._id, item.quantity + 1)}
              >
                <Plus className="h-4 w-4 text-gray-300 cursor-pointer" />
              </button>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-lg font-semibold text-emerald-400">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
              <button
                className="text-red-400 hover:text-red-300 cursor-pointer"
                onClick={() => removeAllCart(item._id)}
              >
                <Trash className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CartItem;
