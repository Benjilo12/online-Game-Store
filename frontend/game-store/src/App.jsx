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
        <Route
          path="/"
          element={user ? <GamePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/category"
          element={user ? <Category /> : <Navigate to="/login" />}
        />
        <Route
          path="/watchlist"
          element={user ? <Watchlist /> : <Navigate to="/login" />}
        />
        <Route
          path="/cart"
          element={user ? <Cart /> : <Navigate to="/login" />}
        />
        <Route
          path="/purchase-success"
          element={
            <DashboardLayout>
              <PurchaseSuccessPage />
            </DashboardLayout>
          }
        />
        <Route path="/home-page" element={<Homepage />} />
        <Route
          path="/signup"
          element={!user ? <SignUpPage /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!user ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/secret-dashboard"
          element={
            user?.role === "admin" ? <AdminPage /> : <Navigate to="/login" />
          }
        />
      </Routes>
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
