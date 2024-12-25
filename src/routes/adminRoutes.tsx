import { Route, Routes } from "react-router-dom";
import { AdminDashboard } from "../pages/Admin/AdminDashboard";
import { NotFound } from "@/pages/NotFound";
import { AdminSettings } from "@/pages/Admin/AdminSettings";

export const AdminRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="settings" element={<AdminSettings />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};
