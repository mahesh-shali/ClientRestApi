// src/pages/AdminDashboard.tsx
import React, { useState, useEffect } from "react";
import Preloading from "../../contexts/Preloading"; // Import Preloading component

export const AdminDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate a loading delay (you can replace this with your actual data fetching logic)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // Set loading to false after 2 seconds
    }, 1000); // Adjust time as needed

    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, []);

  return (
    <div>
      {isLoading ? (
        <Preloading />
      ) : (
        <div>
          <h1>Hello Admin</h1>
          {/* Add the rest of the admin dashboard content here */}
        </div>
      )}
    </div>
  );
};
