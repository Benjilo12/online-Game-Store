import { ArrowRight, CheckCircle, HandHeart } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import axios from "../lib/axios";
import Confetti from "react-confetti";
import { useWindowSize } from "@react-hook/window-size";
import { useCartStore } from "../stores/useCartStore";

const PurchaseSuccessPage = () => {
  const [isProcessing, setIsProcessing] = useState(true);
  const { clearCart } = useCartStore();
  const [error, setError] = useState(null);
  const [width, height] = useWindowSize();

  useEffect(() => {
    const handleCheckoutSuccess = async (sessionId) => {
      try {
        await axios.post("/payment/checkout-success", {
          sessionId,
        });
        clearCart(); // ⚠️ async but not awaited
      } catch (error) {
        console.log(error);
      } finally {
        setIsProcessing(false);
      }
    };

    const sessionId = new URLSearchParams(window.location.search).get(
      "session_id"
    );
    if (sessionId) {
      handleCheckoutSuccess(sessionId);
    } else {
      setIsProcessing(false);
      setError("No session ID found in the URL");
    }
  }, []);

  if (isProcessing)
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500 mx-auto mb-4"></div>
          <p className="text-gray-300">Processing your purchase...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center h-full px-4">
        <div className="max-w-md w-full bg-gray-800 rounded-lg shadow-xl p-6 text-center">
          <h2 className="text-xl font-bold text-red-400 mb-2">Error</h2>
          <p className="text-gray-300">{error}</p>
          <Link
            to="/"
            className="mt-4 inline-block bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
          >
            Return Home
          </Link>
        </div>
      </div>
    );

  return (
    <div className="flex items-center justify-center h-full px-4 py-8">
      <Confetti
        width={width}
        height={height}
        gravity={0.1}
        style={{ zIndex: 99 }}
        numberOfPieces={700}
        recycle={false}
      />

      <div className="max-w-md w-full bg-gray-800 rounded-lg shadow-xl overflow-hidden relative z-10 mx-2">
        <div className="p-6 sm:p-8">
          <div className="flex justify-center">
            <CheckCircle className="text-emerald-400 w-12 h-12 sm:w-16 sm:h-16 mb-4" />
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-emerald-400 mb-2">
            Purchase Successful!
          </h1>

          <p className="text-gray-300 text-center text-sm sm:text-base mb-2">
            Thank you for your order. {"We're"} processing it now.
          </p>
          <p className="text-emerald-400 text-center text-xs sm:text-sm mb-6">
            Check your email for order details and updates.
          </p>
          <div className="bg-gray-700 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs sm:text-sm text-gray-400">
                Order number
              </span>
              <span className="text-xs sm:text-sm font-semibold text-emerald-400">
                #12345
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm text-gray-400">
                Game in Library
              </span>
              <span className="text-xs sm:text-sm font-semibold text-emerald-400">
                download game to play
              </span>
            </div>
          </div>

          <div className="space-y-3 sm:space-y-4">
            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4
              rounded-lg transition duration-300 flex items-center justify-center text-sm sm:text-base"
            >
              <HandHeart className="mr-2" size={18} />
              Thanks for trusting us!
            </button>
            <Link
              to={"/category"}
              className="w-full bg-gray-700 hover:bg-gray-600 text-emerald-400 font-bold py-2 px-4 
              rounded-lg transition duration-300 flex items-center justify-center text-sm sm:text-base cursor-pointer"
            >
              Continue Shopping
              <ArrowRight className="ml-2" size={18} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseSuccessPage;
