import { Routes, Route } from "react-router-dom";
import { AdminDashboard } from "../pages/Admin/AdminDashboard"; // Example admin page
import { AdminSettings } from "../pages/Admin/AdminSettings"; // Example admin page

export const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<AdminDashboard />} />
      <Route path="settings" element={<AdminSettings />} />
      {/* You can add more admin-specific routes here */}
    </Routes>
  );
};
