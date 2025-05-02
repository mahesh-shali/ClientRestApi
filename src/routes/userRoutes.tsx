// src/routes/userRoutes.tsx
import { Route, Routes } from "react-router-dom";
import { UserDashboard } from "../pages/User/UserDashboard";
import { NotFound } from "../pages/NotFound";
import { UserProfile } from "../pages/User/UserProfile";
import { Master } from "../pages/User/Pages/Master";
import { Sales } from "../pages/User/Pages/Sales";
import { Outsourcing } from "../pages/User/Pages/Outsourcing";
import { Production } from "../pages/User/Pages/Production";
import { Inventory } from "../pages/User/Pages/Inventory";
import { Planning } from "../pages/User/Pages/Planning";
import { CashFlow } from "../pages/User/Pages/CashFlow";
import { Inspection } from "../pages/User/Pages/Inspection";
import { Maintenance } from "../pages/User/Pages/Maintenance";
import { HumanResource } from "../pages/User/Pages/HumanResource";
import { Reports } from "../pages/User/Pages/Reports";
import { Utilities } from "../pages/User/Pages/Utilities";

export const UserRoutes = () => (
  <Routes>
    <Route path="dashboard" element={<UserDashboard />} />
    <Route path="profile" element={<UserProfile />} />
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
);
