import { Routes, Route } from "react-router-dom";
import { UserDashboard } from "../pages/User/UserDashboard"; // Example user page
import { UserProfile } from "../pages/User/UserProfile"; // Example user page

export const UserRoutes = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<UserDashboard />} />
      <Route path="profile" element={<UserProfile />} />
      {/* You can add more user-specific routes here */}
    </Routes>
  );
};
