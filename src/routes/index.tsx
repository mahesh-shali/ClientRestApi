import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

// Import role-specific routes
import { AdminRoutes } from "./adminRoutes";
import { UserRoutes } from "./userRoutes";

// Import common pages
import { Login } from "../pages/Login";
import { UnauthorizedPage } from "../pages/UnauthorizedPage";
import { Home } from "../pages/Home";
import { NotFound } from "../pages/NotFound";
import { Register } from "@/pages/Register";

export const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
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
