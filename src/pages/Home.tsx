import React, { useState } from "react";
import { Navbar } from "../components/Navbar";
import { useTitle } from "../hooks/useTitle";

export const Home: React.FC = () => {
  useTitle("Home");
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className="h-screen flex flex-col bg-white overflow-hidden">
      {/* Navbar with Scrollbar */}
      <Navbar toggleSidebar={toggleSidebar} isSidebarVisible={undefined} />

      {/* Main Content */}
      <div className="flex-grow overflow-auto pt-16 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent scrollbar-thumb-rounded-md">
        <div className="container flex flex-col bg-white mx-auto px-4 py-8 mt-4">
          <section className="flex flex-col md:flex-row items-center justify-between p-6 rounded-lg shadow-lg mb-8">
            <div className="md:w-1/2 p-4 text-black">
              <h2 className="text-3xl font-bold mb-4">Section 1 Title</h2>
              <p className="text-lg">
                This is the content of the first section. You can add text,
                buttons, or any other UI components here.
              </p>
              <button className="btn btn-primary mt-4">Learn More</button>
            </div>
            <div className="md:w-1/2 p-4">
              <img
                src="https://via.placeholder.com/400"
                alt="Section 1 Image"
                className="rounded-lg shadow-md"
              />
            </div>
          </section>

          <section className="flex flex-col-reverse md:flex-row items-center justify-between p-6 rounded-lg shadow-lg">
            <div className="md:w-1/2 p-4">
              <img
                src="https://via.placeholder.com/400"
                alt="Section 2 Image"
                className="rounded-lg shadow-md"
              />
            </div>
            <div className="md:w-1/2 p-4 text-black">
              <h2 className="text-3xl font-bold mb-4">Section 2 Title</h2>
              <p className="text-lg">
                This is the content of the second section. Add images, text, or
                any other relevant details here.
              </p>
              <button className="btn btn-secondary mt-4">Explore</button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
