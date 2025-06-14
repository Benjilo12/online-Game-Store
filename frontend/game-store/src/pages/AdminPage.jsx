import { PlusCircle, ShoppingBasket } from "lucide-react";
import { useEffect, useState } from "react";
import { animate, motion } from "motion/react";
import ProductsList from "../components/ProductsList";
import CreateProductForm from "../components/CreateProductForm";
import Navbar from "../components/Navbar";
import { useProductStore } from "../stores/useProductStore";

const tabs = [
  { id: "create", label: "Create Game", icon: PlusCircle },
  { id: "products", label: "Products", icon: ShoppingBasket },
];

function AdminPage() {
  const [activeTab, setActiveTab] = useState("create");
  const { fetchAllProducts } = useProductStore();

  // Fetch all products when the component mounts
  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="min-h-screen bg-gray-900 text-white relative  ">
        <div className="relative z-10 container mx-auto px-4 py-6">
          <motion.h1
            className="text-4xl font-bold mb-8 text-emerald-400 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Admin Dashboard
          </motion.h1>
          <div className="flex justify-center mb-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-2 mx-2 rounded-md transition-colors duration-200 ${
                  activeTab === tab.id
                    ? "bg-emerald-600 text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                <tab.icon className="mr-2 h-5 w-5" />
                {tab.label}
              </button>
            ))}
          </div>
          {activeTab === "create" && <CreateProductForm />}
          {activeTab === "products" && <ProductsList />}
        </div>
      </div>
    </>
  );
}

export default AdminPage;
