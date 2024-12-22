import { Routes, Route } from "react-router-dom";
import { AdminRoutes } from "./adminRoutes";
import { UserRoutes } from "./userRoutes";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Generic Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />

      {/* Admin Routes */}
      <Route path="/admin/*" element={<AdminRoutes />} />

      {/* User Routes */}
      <Route path="/user/*" element={<UserRoutes />} />
    </Routes>
  );
};
