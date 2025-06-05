import { useState } from "react";
import Header from "../components/Header";
import SideMenu from "../components/SideMenu";

function GamePage() {
  const [activeTab, setActiveTab] = useState(false);

  const handleToggleActive = () => {
    setActiveTab(!activeTab);
  };

  return (
    <div className="absolute inset-0 flex gap-[15px] bg-gray-900 text-white overflow-hidden">
      <SideMenu activeTab={activeTab} />
      <div
        className={`relative h-screen rounded-r-[30px] border-r border-black/10 transition-all duration-500  bg-gray-900 ${
          activeTab ? "w-[93%]" : "w-[82%]"
        }`}
      >
        <Header handleToggleActive={handleToggleActive} />
      </div>
    </div>
  );
}

export default GamePage;
