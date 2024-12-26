// src/pages/AdminDashboard.tsx
import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";

export const AdminDashboard = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };
  return (
    <div className="bg-white h-screen">
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="flex h-full">
        {" "}
        {/* Set this div to take full height */}
        {/* Sidebar */}
        <div
          className={`w-64 text-base-content shadow-md flex flex-col ${
            isSidebarVisible ? "block" : "hidden"
          }`}
        >
          <Sidebar />
        </div>
        {/* Main Content */}
        <div className="flex-grow p-6 bg-gray-100 overflow-y-auto h-full scrollbar-hide rounded-3xl">
          <div>
            <h1 className="text-2xl font-bold">Welcome to the Dashboard!</h1>
            <p className="mt-4">Select an option from the sidebar.</p>

            {/* Add more content here to see scrolling */}
            <div className="mt-4">
              {/* Long content */}
              {Array.from({ length: 50 }, (_, i) => (
                <p key={i}>This is content block {i + 1}</p>
              ))}
            </div>
          </div>
          <section>
            <div>hello</div>
          </section>
        </div>
      </div>
    </div>
  );
};
