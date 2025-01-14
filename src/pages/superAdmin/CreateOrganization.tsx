import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
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

export const CreateOrganization = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [cards, setCards] = useState<any[]>([]);
  const [charts, setCharts] = useState<ChartData[]>([]);

  useEffect(() => {
    setCharts(chartData);
    setCards(dashboardData);
  }, []);

  // Handle window resizing for sidebar auto toggle
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1280) {
        setIsSidebarVisible(false); // Auto-hide sidebar on smaller screens
      } else {
        setIsSidebarVisible(true); // Show sidebar on larger screens
      }
    };

    // Initialize resize listener
    handleResize();
    window.addEventListener("resize", handleResize);

    // Cleanup resize listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };
  return (
    <>
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
              <form action=""></form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
