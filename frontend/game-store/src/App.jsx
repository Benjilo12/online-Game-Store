import { Navigate, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
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
import { LoadingSpinner } from "./components/LoadingSpinner";

function App() {
  const { user, checkAuth, checkingAuth } = useUserStore();
  const { getCartItems } = useCartStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    getCartItems();
  }, [getCartItems]);

  if (checkingAuth) return <LoadingSpinner />;
  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden ">
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
          path="/signup"
          element={!user ? <SignUpPage /> : <Navigate to="/login" />}
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
      <Toaster />
    </div>
  );
}

export default App;
