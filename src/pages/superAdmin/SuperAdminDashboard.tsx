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

export const SuperAdminDashboard = () => {
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
            {/* Card Section */}
            <div className="flex flex-wrap gap-2 m-4">
              {cards.map((card) => (
                <div
                  key={card.id}
                  className="card shadow-xl w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4" // Adjusted sizes for responsiveness
                >
                  <div className="card-body">
                    <h2 className="card-title text-xl text-black">
                      {card.title}
                    </h2>
                    <p className="text-3xl font-bold text-black">
                      {card.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Chart Section */}
            <div className="flex items-center">
              {charts.map((chart) => {
                const ChartComponent =
                  chart.type === "line"
                    ? Line
                    : chart.type === "bar"
                    ? Bar
                    : chart.type === "doughnut"
                    ? Doughnut
                    : null;

                const chartStyle =
                  chart.type === "line" || chart.type === "bar"
                    ? { width: "100%", height: "300px" }
                    : { width: "300px", height: "300px" };

                return (
                  <div
                    key={chart.id}
                    className="card bg-white w-1/3 shadow-xl m-4 p-4"
                  >
                    <div className="card-body">
                      {ChartComponent && (
                        <div style={chartStyle}>
                          <ChartComponent
                            data={chart.data}
                            options={chart.options}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Table Section */}
            <div className="overflow-x-auto card bg-gray-50 shadow-md m-4 p-6">
              <div className="card-body">
                <table className="table table-md">
                  <thead>
                    <tr>
                      {tableData.columns.map((column, index) => (
                        <th key={index}>{column}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.rows.map((row) => (
                      <tr key={row.id}>
                        <th>{row.id}</th>
                        <td>{row.name}</td>
                        <td>{row.job}</td>
                        <td>{row.company}</td>
                        <td>{row.location}</td>
                        <td>{row.lastLogin}</td>
                        <td>{row.favoriteColor}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      {tableData.columns.map((column, index) => (
                        <th key={index}>{column}</th>
                      ))}
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
