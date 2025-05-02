import { useState } from "react";
import { Navbar } from "../../../components/Navbar";
import { Sidebar } from "../../../components/Sidebar";
import { useHandleSidebarResize } from "../../../contexts/useHandleSidebarResize";

export const Sales = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  useHandleSidebarResize(setIsSidebarVisible);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };
  return (
    <>
      <div className="bg-white h-screen flex flex-col">
        <Navbar
          toggleSidebar={toggleSidebar}
          isSidebarVisible={isSidebarVisible}
        />

        {/* Main Content */}
        <div className="flex flex-grow overflow-hidden">
          {/* Sidebar */}
          <div
            className={`w-64 text-base-content shadow-md flex flex-col ${
              isSidebarVisible ? "block" : "hidden"
            }`}
          >
            <Sidebar />
          </div>
          <div className="flex flex-grow p-6 bg-gray-100 overflow-auto scrollbar-hide">
            <div className="flex-grow flex-col">
              {/* Card Section */}
              <div className="flex flex-wrap gap-2 m-4">Sales</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
