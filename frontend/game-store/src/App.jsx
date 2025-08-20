import { Navigate, Route, Routes } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import { Toaster } from "react-hot-toast";
import { useUserStore } from "./stores/useUserStore";
import { useEffect } from "react";
import AdminPage from "./pages/AdminPage";
import GamePage from "./pages/GamePage";
import Category from "./pages/Category";
import Watchlist from "./pages/Watchlist";
import Cart from "./pages/Cart";
import { useCartStore } from "./stores/useCartStore";
import PurchaseSuccessPage from "./pages/PurchaseSuccessPage";
import DashboardLayout from "./layout/DashboardLayout";
import PageLoader from "./components/PageLoader";
import Homepage from "./pages/Homepage";

function App() {
  const { user, checkAuth, checkingAuth } = useUserStore();
  const { getCartItems } = useCartStore();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        await checkAuth();
      } catch (error) {
        console.log("Auth initialization error:", error);
      }
    };
    initializeAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!user) return;
    getCartItems();
  }, [getCartItems, user]);

  if (checkingAuth) return <PageLoader />;

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route
          path="/signup"
          element={!user ? <SignUpPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!user ? <LoginPage /> : <Navigate to="/game-page" />}
        />
        <Route
          path="/secret-dashboard"
          element={
            user?.role === "admin" ? <AdminPage /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/game-page"
          element={user ? <GamePage /> : <Navigate to="/" />}
        />
        <Route
          path="/category"
          element={user ? <Category /> : <Navigate to="/" />}
        />
        <Route
          path="/watchlist"
          element={user ? <Watchlist /> : <Navigate to="/" />}
        />
        <Route path="/cart" element={user ? <Cart /> : <Navigate to="/" />} />
        <Route
          path="/purchase-success"
          element={
            <DashboardLayout>
              <PurchaseSuccessPage />
            </DashboardLayout>
          }
        />
      </Routes>
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
