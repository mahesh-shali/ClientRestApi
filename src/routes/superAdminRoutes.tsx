import { NotFound } from "@/pages/NotFound";
import { CreateOrganization } from "@/pages/superAdmin/CreateOrganization";
import { SuperAdminDashboard } from "@/pages/superAdmin/SuperAdminDashboard";
import { Route, Routes } from "react-router-dom";

export const SuperAdminRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="dashboard" element={<SuperAdminDashboard />} />
        <Route path="create" element={<CreateOrganization />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};
