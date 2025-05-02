import { useState } from "react";
import { Navbar } from "../../../components/Navbar";
import { Sidebar } from "../../../components/Sidebar";
import { useHandleSidebarResize } from "../../../contexts/useHandleSidebarResize";
import { AddUser } from "@/components/SuperAdmin/Admin/AddUser";

export const Master = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  useHandleSidebarResize(setIsSidebarVisible);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className="bg-white h-screen flex flex-col">
      <Navbar
        toggleSidebar={toggleSidebar}
        isSidebarVisible={isSidebarVisible}
      />
      <div className="flex flex-grow overflow-hidden">
        <div
          className={`w-64 text-base-content shadow-md flex flex-col ${
            isSidebarVisible ? "block" : "hidden"
          }`}
        >
          <Sidebar />
        </div>
        <div className="flex flex-grow p-6 bg-gray-100 overflow-auto scrollbar-hide">
          <div className="flex-grow flex-col">
            <div className="flex flex-wrap gap-2 m-4">
              <div className="w-64 bg-gray-100 shadow-md rounded-lg">
                <div
                  className="bg-gray-800 text-white font-semibold text-lg p-4 rounded-t-lg cursor-pointer"
                  onClick={toggleMenu}
                >
                  Admin
                </div>

                {isDrawerOpen && (
                  <AddUser isOpen={isDrawerOpen} closeDrawer={closeDrawer} />
                )}

                {isMenuOpen && (
                  <ul className="p-4 space-y-2 transition ease-in-out duration-300">
                    <li>
                      <span
                        onClick={toggleDrawer}
                        className="block text-gray-700 hover:bg-gray-200 px-3 py-2 rounded-lg transition ease-in-out duration-300 cursor-pointer"
                      > 
                        Add User
                      </span>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block text-gray-700 hover:bg-gray-200 px-3 py-2 rounded-lg transition"
                      >
                        User Rights
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block text-gray-700 hover:bg-gray-200 px-3 py-2 rounded-lg transition"
                      >
                        Settings
                      </a>
                    </li>
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
