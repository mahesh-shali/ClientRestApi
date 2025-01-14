import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { useAuth } from "../../hooks/useAuth";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import {
  dashboardData,
  chartData,
  tableData,
  ChartData,
} from "../../utils/statics";
import axios from "axios";
import Preloading from "@/contexts/Preloading";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface User {
  userId: number;
  userName: string;
  userEmail: string;
}

interface Organization {
  organizationId: number;
  organizationName: string;
  users: User[];
}

export const AdminDashboard = () => {
  const { user } = useAuth();
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [cards, setCards] = useState<any[]>([]);
  const [charts, setCharts] = useState<ChartData[]>([]);

  useEffect(() => {
    setCharts(chartData);
    setCards(dashboardData);
  }, []);

  useEffect(() => {
    const fetchOrganizationDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_DEV_SERVER_API_URL}/api/admin/organization/${
            user.organizationId
          }`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setOrganization(response.data);
      } catch (err) {
        console.log("Failed to fetch organization details.");
      }
    };

    fetchOrganizationDetails();
  }, [user.organizationId]);

  // Handle window resizing for sidebar auto toggle
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1280) {
        setIsSidebarVisible(false);
      } else {
        setIsSidebarVisible(true);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className="bg-white h-screen flex flex-col">
      {/* Navbar */}
      <Navbar
        toggleSidebar={toggleSidebar}
        isSidebarVisible={isSidebarVisible}
      />

      {/* Main Content */}
      <div className="flex flex-grow overflow-hidden">
        {/* Sidebar */}
        <div
          className={`w-64 text-base-content shadow-md flex flex-col ${
            isSidebarVisible ? "block" : "hidden"
          }`}
        >
          <Sidebar />
        </div>

        {/* Main Content Area */}
        <div className="flex flex-grow p-6 bg-gray-100 overflow-auto scrollbar-hide rounded-3xl">
          <div className="flex-grow flex-col">
            <div>
              <h1>Organization Details</h1>
              {organization ? (
                <div>
                  <h2>{organization?.organizationName}</h2>
                  <h3>Users:</h3>
                  <ul>
                    {organization.users.map((user) => (
                      <li key={user.userId}>
                        <strong>Name:</strong> {user.userName} |{" "}
                        <strong>Email:</strong> {user.userEmail}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p>
                  <Preloading />
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
