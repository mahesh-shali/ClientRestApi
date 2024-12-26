import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
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
import Preloading from "@/contexts/Preloading";

// Wrapper to force reload twice before showing NotFound
const ForceReload = () => {
  useEffect(() => {
    const reloadCount = parseInt(
      sessionStorage.getItem("reloadCount") || "0",
      10
    );

    if (reloadCount < 2) {
      sessionStorage.setItem("reloadCount", (reloadCount + 1).toString());
      setTimeout(() => {
        window.location.reload();
      }, 1000); // 1-second delay for reload
    } else {
      sessionStorage.removeItem("reloadCount"); // Reset after two reloads
    }
  }, []);

  return null; // Prevent rendering during reload
};

// Delay before rendering NotFound page
const DelayedNotFound = () => {
  const [showNotFound, setShowNotFound] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowNotFound(true);
    }, 2000); // 1-second delay before showing NotFound

    return () => clearTimeout(timeout);
  }, []);

  return showNotFound ? <NotFound /> : <Preloading />;
};

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
      <Route
        path="*"
        element={
          <>
            <ForceReload />
            <DelayedNotFound />
          </>
        }
      />
    </Routes>
  );
};
