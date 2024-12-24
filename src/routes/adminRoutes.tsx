// src/routes/adminRoutes.tsx
import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { AdminDashboard } from "../pages/Admin/AdminDashboard"; // Admin Dashboard
import { NotFound } from "@/pages/NotFound";
import Preloading from "../contexts/Preloading"; // Import Preloading component

export const AdminRoutes = () => {
  const [loading, setLoading] = useState(true);

  // Simulate data fetching or loading
  useEffect(() => {
    // Simulate loading process, like data fetching or route load time
    setTimeout(() => {
      setLoading(false); // Set loading to false after a delay (simulating async operation)
    }, 500); // Adjust the time as needed
  }, []);

  return (
    <>
      {loading ? (
        // Show preloading spinner until loading is complete
        <Preloading />
      ) : (
        <Routes>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
    </>
  );
};
