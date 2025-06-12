import { useEffect, useState } from "react";
import { useProductStore } from "../stores/useProductStore";
import DisplayPage from "./DisplayPage";
import DashboardLayout from "../layout/DashboardLayout";

function GamePage() {
  const [games, setGames] = useState([]);
  const { products, loading, fetchAllProducts } = useProductStore();

  useEffect(() => {
    fetchAllProducts();
  }, []);

  useEffect(() => {
    if (Array.isArray(products) && products.length > 0) {
      setGames(products);
    }
  }, [products]);

  return (
    <DashboardLayout>
      <DisplayPage games={games} key={games._id} />
    </DashboardLayout>
  );
}

export default GamePage;
