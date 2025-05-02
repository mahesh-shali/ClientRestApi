import { Route, Routes } from "react-router-dom";
import { AdminDashboard } from "../pages/Admin/AdminDashboard";
import { NotFound } from "../pages/NotFound";
import { AdminSettings } from "../pages/Admin/AdminSettings";
import { AddUser } from "../pages/Admin/AddUser";
import { UserRights } from "../pages/Admin/UserRights";
import { Master } from "../pages/Admin/Pages/Master";
import { Sales } from "../pages/Admin/Pages/Sales";
import { Outsourcing } from "../pages/Admin/Pages/Outsourcing";
import { Production } from "../pages/Admin/Pages/Production";
import { Inventory } from "../pages/Admin/Pages/Inventory";
import { Planning } from "../pages/Admin/Pages/Planning";
import { CashFlow } from "../pages/Admin/Pages/CashFlow";
import { Inspection } from "../pages/Admin/Pages/Inspection";
import { Maintenance } from "../pages/Admin/Pages/Maintenance";
import { HumanResource } from "../pages/Admin/Pages/HumanResource";
import { Reports } from "../pages/Admin/Pages/Reports";
import { Utilities } from "../pages/Admin/Pages/Utilities";

export const AdminRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="settings" element={<AdminSettings />} />
        <Route path="add-user" element={<AddUser />} />
        <Route path="user-rights" element={<UserRights />} />
        <Route path="master" element={<Master />} />
        <Route path="sales" element={<Sales />} />
        <Route path="outsourcing" element={<Outsourcing />} />
        <Route path="production" element={<Production />} />
        <Route path="inventory" element={<Inventory />} />
        <Route path="planning" element={<Planning />} />
        <Route path="cash flow" element={<CashFlow />} />
        <Route path="inspection" element={<Inspection />} />
        <Route path="maintenance" element={<Maintenance />} />
        <Route path="human resource" element={<HumanResource />} />
        <Route path="reports" element={<Reports />} />
        <Route path="utilities" element={<Utilities />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};
