import { NotFound } from "../pages/NotFound";
import { CreateOrganization } from "../pages/superAdmin/CreateOrganization";
import { CashFlow } from "../pages/superAdmin/Pages/CashFlow";
import { HumanResource } from "../pages/superAdmin/Pages/HumanResource";
import { Inspection } from "../pages/superAdmin/Pages/Inspection";
import { Inventory } from "../pages/superAdmin/Pages/Inventory";
import { Maintenance } from "../pages/superAdmin/Pages/Maintenance";
import { Master } from "../pages/superAdmin/Pages/Master";
import { Outsourcing } from "../pages/superAdmin/Pages/Outsourcing";
import { Planning } from "../pages/superAdmin/Pages/Planning";
import { Production } from "../pages/superAdmin/Pages/Production";
import { Reports } from "../pages/superAdmin/Pages/Reports";
import { Sales } from "../pages/superAdmin/Pages/Sales";
import { Utilities } from "../pages/superAdmin/Pages/Utilities";
import { SuperAdminDashboard } from "../pages/superAdmin/SuperAdminDashboard";
import { Route, Routes } from "react-router-dom";

export const SuperAdminRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="dashboard" element={<SuperAdminDashboard />} />
        <Route path="create" element={<CreateOrganization />} />
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
