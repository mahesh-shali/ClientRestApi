// src/routes/userRoutes.tsx
import React from "react";
import { Route, Routes } from "react-router-dom";
import { UserDashboard } from "../pages/User/UserDashboard"; // User Dashboard
import { NotFound } from "@/pages/NotFound";
import { UserProfile } from "@/pages/User/UserProfile";

export const UserRoutes = () => (
  <Routes>
    <Route path="dashboard" element={<UserDashboard />} />
    <Route path="profile" element={<UserProfile />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);
