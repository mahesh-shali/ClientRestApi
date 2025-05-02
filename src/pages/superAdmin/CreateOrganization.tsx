import { useEffect, useState } from "react";
import { Navbar } from "../../components/Navbar";
import { Sidebar } from "../../components/Sidebar";
// import { Line, Bar, Doughnut } from "react-chartjs-2";
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
  // _tableData,
  ChartData,
} from "../../utils/statics";
import { useHandleSidebarResize } from "../../contexts/useHandleSidebarResize";

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
  const [_cards, setCards] = useState<any[]>([]);
  const [_charts, setCharts] = useState<ChartData[]>([]);

  useEffect(() => {
    setCharts(chartData);
    setCards(dashboardData);
  }, []);

  useHandleSidebarResize(setIsSidebarVisible);
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
          <div className="flex flex-grow p-6 bg-gray-100 overflow-auto scrollbar-hide">
            <div className="flex-grow flex-col">
              <form action=""></form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
