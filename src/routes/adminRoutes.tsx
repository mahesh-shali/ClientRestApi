import { Route, Routes } from "react-router-dom";
import { AdminDashboard } from "../pages/Admin/AdminDashboard";
import { NotFound } from "@/pages/NotFound";
import { AdminSettings } from "@/pages/Admin/AdminSettings";
import { AddUser } from "@/pages/Admin/AddUser";
import { UserRights } from "@/pages/Admin/UserRights";

export const AdminRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="settings" element={<AdminSettings />} />
        <Route path="add-user" element={<AddUser />} />

        <Route path="user-rights" element={<UserRights />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};
