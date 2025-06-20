import { useState } from "react";

import SideMenu from "../components/SideMenu";
import Header from "../components/Header";

function DashboardLayout({ children }) {
  const [activeTab, setActiveTab] = useState(false);

  const handleToggleActive = () => {
    setActiveTab(!activeTab);
  };

  return (
    <div className="absolute inset-0 flex bg-gray-800 text-white overflow-hidden">
      <SideMenu activeTab={activeTab} />

      <div
        className={`flex flex-col h-screen transition-all duration-300 ease-in-out ${
          activeTab ? "w-[calc(100%-80px)]" : "w-[calc(100%-240px)]"
        }`}
      >
        <Header handleToggleActive={handleToggleActive} />

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="p-6">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
