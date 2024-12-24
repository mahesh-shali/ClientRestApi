// src/routes/index.tsx
import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"; // Assuming useAuth is your custom hook

// Import role-specific routes
import { AdminRoutes } from "./adminRoutes";
import { UserRoutes } from "./userRoutes";

// Import common pages
import { Login } from "../pages/Login";
import { UnauthorizedPage } from "../pages/UnauthorizedPage";
import { Home } from "../pages/Home";
import { NotFound } from "../pages/NotFound";

export const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/unauthorized" element={<UnauthorizedPage />} />

      {/* Role-Based Routes */}
      {user?.role === "admin" && (
        <Route path="admin/*" element={<AdminRoutes />} />
      )}
      {user?.role === "user" && (
        <Route path="user/*" element={<UserRoutes />} />
      )}

      {/* Fallback for unknown routes */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
