// src/pages/AdminDashboard.tsx
import React, { useState, useEffect } from "react";
import Preloading from "../../contexts/Preloading";
import { Navbar } from "@/components/Navbar";

export const AdminDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {isLoading ? (
        <Preloading />
      ) : (
        <div className="container">
          <Navbar />
          <h1>Hello Admin</h1>
        </div>
      )}
    </div>
  );
};
