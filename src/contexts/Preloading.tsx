import React from "react";

const Preloading = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <div className="border-4 border-gray-300 border-t-4 border-t-blue-500 rounded-full w-16 h-16 animate-spin"></div>
      <p className="mt-4 text-gray-700">Loading...</p>
    </div>
  );
};

export default Preloading;
