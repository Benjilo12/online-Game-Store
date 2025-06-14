import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";
import { useCartStore } from "../stores/useCartStore";
import DashboardLayout from "../layout/DashboardLayout";
import { useEffect } from "react";

const CartPage = () => {
  const {
    cart,
    subtotal,
    total,
    getCartItems,
    clearCart,
    loading: cartLoading,
  } = useCartStore();

  useEffect(() => {
    getCartItems();
  }, [getCartItems]);

  const handleCheckout = () => {
    // Add your checkout logic here
    console.log("Proceeding to checkout");
  };

  const handleClearCart = async () => {
    try {
      await clearCart();
    } catch (error) {
      // Error is handled in the store
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6 h-full overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-white">
              Your Shopping Cart
            </h1>
            {cart.length > 0 && (
              <button
                onClick={handleClearCart}
                className="text-red-400 hover:text-red-300 text-sm font-medium disabled:opacity-50 cursor-pointer"
                disabled={cartLoading}
              >
                {cartLoading ? "Clearing..." : "Clear Cart"}
              </button>
            )}
          </div>

          {cartLoading && cart.length === 0 ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
            </div>
          ) : cart.length === 0 ? (
            <EmptyCartUI />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <motion.div
                className="lg:col-span-2 space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {cart.map((item) => (
                  <CartItem key={item._id} item={item} />
                ))}
              </motion.div>

              <div className="lg:col-span-1">
                <motion.div
                  className="bg-gray-800 rounded-lg p-6 border border-gray-700 sticky top-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Shipping</span>
                      <span className="text-emerald-400">Free</span>
                    </div>
                    <div className="border-t border-gray-700 my-3"></div>
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                  <button
                    onClick={handleCheckout}
                    className="w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-colors disabled:opacity-50 cursor-pointer"
                    disabled={cartLoading || cart.length === 0}
                  >
                    Proceed to Checkout
                  </button>
                </motion.div>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

const EmptyCartUI = () => (
  <motion.div
    className="flex flex-col items-center justify-center py-16"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <ShoppingCart className="h-24 w-24 text-gray-300 mb-4" />
    <h3 className="text-2xl font-semibold mb-2">Your cart is empty</h3>
    <p className="text-gray-400 mb-6">
      Looks like you haven't added anything to your cart yet.
    </p>
    <Link
      to="/"
      className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-md transition-colors"
    >
      Start Shopping
    </Link>
  </motion.div>
);

export default CartPage;
