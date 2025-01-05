import axios from "axios";
import {
  faWarehouse,
  faBoxesStacked,
  faCartShopping,
  faMoneyCheckDollar,
  faPiggyBank,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";
import { faGg } from "@fortawesome/free-brands-svg-icons";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// -------------------- Types --------------------

export interface Menu {
  id: string;
  name: string;
  logo?: string; // Make 'logo' optional for submenus
  route?: string;
  submenus?: Menu[];
}

export interface DashboardCard {
  id: number;
  bgColor: string;
  title: string;
  value: string;
}

export interface ChartData {
  id: number;
  type: "line" | "bar" | "doughnut";
  data: any;
  options: any;
}

export interface TableColumn {
  columns: string[];
  rows: TableRow[];
}

export interface TableRow {
  id: number;
  name: string;
  job: string;
  company: string;
  location: string;
  lastLogin: string;
  favoriteColor: string;
}

// -------------------- API Functions --------------------

// Fetch all countries data including flags and country codes
export const fetchCountries = async (): Promise<any[]> => {
  try {
    const response = await axios.get("https://restcountries.com/v3.1/all");
    return response.data;
  } catch (error) {
    console.error("Error fetching countries data:", error);
    return [];
  }
};

// Get user's IP address
export const getIpAddress = async (): Promise<string> => {
  try {
    const response = await axios.get("https://api.ipify.org?format=json");
    return response.data.ip;
  } catch (error) {
    console.error("Failed to fetch IP address", error);
    return "Unknown";
  }
};

// Get browser information
export const getBrowserInfo = (
  userAgent: string
): { browserName: string; browserVersion: string } => {
  let browserName = "Unknown";
  let browserVersion = "Unknown";

  if (userAgent.includes("Chrome") && userAgent.includes("Safari")) {
    browserName = "Chrome";
    browserVersion = userAgent.split("Chrome/")[1]?.split(" ")[0] || "Unknown";
  } else if (userAgent.includes("Firefox")) {
    browserName = "Firefox";
    browserVersion = userAgent.split("Firefox/")[1] || "Unknown";
  } else if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) {
    browserName = "Safari";
    browserVersion = userAgent.split("Version/")[1]?.split(" ")[0] || "Unknown";
  } else if (userAgent.includes("Edg")) {
    browserName = "Edge";
    browserVersion = userAgent.split("Edg/")[1] || "Unknown";
  } else if (userAgent.includes("MSIE") || userAgent.includes("Trident/")) {
    browserName = "Internet Explorer";
    browserVersion = userAgent.split("MSIE ")[1]?.split(" ")[0] || "Unknown";
  }

  return { browserName, browserVersion };
};

export const getOsName = (platform: string): string => {
  if (platform.includes("Win")) return "Windows";
  if (platform.includes("Mac")) return "macOS";
  if (platform.includes("Linux")) return "Linux";
  if (platform.includes("Android")) return "Android";
  if (platform.includes("iPhone") || platform.includes("iPad")) return "iOS";
  return "Unknown OS";
};

// -------------------- Logo Map --------------------

export const logoMap = {
  faWarehouse,
  faBoxesStacked,
  faCartShopping,
  faMoneyCheckDollar,
  faPiggyBank,
  faGg,
  faChartLine,
};

// -------------------- Chart.js Registration --------------------

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
  Title,
  Tooltip,
  Legend
);

// -------------------- Menu Data --------------------

export const mainMenu: Menu[] = [
  {
    id: "1",
    name: "Master",
    logo: "faWarehouse",
    submenus: [
      {
        id: "1-1",
        name: "Admin",
        route: "/master/admin",
        submenus: [
          { id: "1-1-1", name: "User", route: "/admin/add-user/" },
          { id: "1-1-2", name: "User Rights", route: "/admin/user-rights" },
        ],
      },
      {
        id: "1-2",
        name: "Customers",
        route: "/master/customers",
        submenus: [
          {
            id: "1-2-1",
            name: "Customer",
          },
          { id: "1-2-2", name: "Vendors" },
        ],
      },
    ],
  },
  {
    id: "2",
    name: "Inventory",
    logo: "faBoxesStacked",
    submenus: [
      { id: "2-1", name: "Item", route: "/inventory/item" },
      { id: "2-2", name: "BOM", route: "/inventory/bom" },
    ],
  },
  {
    id: "3",
    name: "Purchase",
    logo: "faCartShopping",
  },
  {
    id: "4",
    name: "Sales / Labour",
    logo: "faMoneyCheckDollar",
  },
  {
    id: "5",
    name: "Sub-Contract",
    logo: "faGg",
  },
  {
    id: "6",
    name: "Cash Flow",
    logo: "faPiggyBank",
  },
];

// -------------------- Dashboard Data --------------------

export const dashboardData: DashboardCard[] = [
  { id: 1, bgColor: "bg-blue-100", title: "Sales", value: "$12,345" },
  { id: 2, bgColor: "bg-blue-100", title: "Inventory", value: "145 Items" },
  { id: 3, bgColor: "bg-blue-100", title: "Profit", value: "$5,432" },
  {
    id: 4,
    bgColor: "bg-blue-100",
    title: "Sales",
    value: "$12,345",
  },
  {
    id: 5,
    bgColor: "bg-blue-100",
    title: "Inventory",
    value: "145 Items",
  },
  {
    id: 6,
    bgColor: "bg-blue-100",
    title: "Profit",
    value: "$5,432",
  },
  {
    id: 7,
    bgColor: "bg-blue-100",
    title: "Inventory",
    value: "145 Items",
  },
  {
    id: 8,
    bgColor: "bg-blue-100",
    title: "Profit",
    value: "$5,432",
  },
];

// -------------------- Chart Data --------------------

export const chartData: ChartData[] = [
  {
    id: 1,
    type: "line",
    data: {
      labels: ["January", "February", "March", "April", "May", "June"],
      datasets: [
        {
          label: "Sales ($)",
          data: [1500, 2000, 2500, 3000, 3500, 4000],
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: { legend: { position: "top" } },
    },
  },
  {
    id: 2,
    type: "bar",
    data: {
      labels: ["January", "February", "March", "April", "May", "June"],
      datasets: [
        {
          label: "Inventory Count",
          data: [50, 100, 150, 200, 250, 300],
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        tooltip: {
          enabled: true,
        },
      },
      scales: {
        x: {
          type: "category",
          beginAtZero: true,
        },
        y: {
          beginAtZero: true,
        },
      },
    },
  },
  {
    id: 3,
    type: "doughnut",
    data: {
      labels: ["Red", "Blue", "Yellow"],
      datasets: [
        {
          label: "Category Distribution",
          data: [300, 500, 200],
          backgroundColor: ["red", "blue", "yellow"],
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
      },
    },
  },
];

// -------------------- Table Data --------------------

export const tableData: TableColumn = {
  columns: [
    "Name",
    "Job",
    "Company",
    "Location",
    "Last Login",
    "Favorite Color",
  ],
  rows: [
    {
      id: 1,
      name: "Cy Ganderton",
      job: "Quality Control Specialist",
      company: "Littel, Schaden and Vandervort",
      location: "Canada",
      lastLogin: "12/16/2020",
      favoriteColor: "Blue",
    },
    {
      id: 2,
      name: "Hart Hagerty",
      job: "Desktop Support Technician",
      company: "Zemlak, Daniel and Leannon",
      location: "United States",
      lastLogin: "12/5/2020",
      favoriteColor: "Purple",
    },
    {
      id: 3,
      name: "Brice Swyre",
      job: "Tax Accountant",
      company: "Carroll Group",
      location: "China",
      lastLogin: "8/15/2020",
      favoriteColor: "Red",
    },
    {
      id: 4,
      name: "Marjy Ferencz",
      job: "Office Assistant I",
      company: "Rowe-Schoen",
      location: "Russia",
      lastLogin: "3/25/2021",
      favoriteColor: "Crimson",
    },
    {
      id: 5,
      name: "Yancy Tear",
      job: "Community Outreach Specialist",
      company: "Wyman-Ledner",
      location: "Brazil",
      lastLogin: "5/22/2020",
      favoriteColor: "Indigo",
    },
    {
      id: 6,
      name: "Irma Vasilik",
      job: "Editor",
      company: "Wiza, Bins and Emard",
      location: "Venezuela",
      lastLogin: "12/8/2020",
      favoriteColor: "Purple",
    },
    {
      id: 7,
      name: "Meghann Durtnal",
      job: "Staff Accountant IV",
      company: "Schuster-Schimmel",
      location: "Philippines",
      lastLogin: "2/17/2021",
      favoriteColor: "Yellow",
    },
    {
      id: 8,
      name: "Sammy Seston",
      job: "Accountant I",
      company: "O'Hara, Welch and Keebler",
      location: "Indonesia",
      lastLogin: "5/23/2020",
      favoriteColor: "Crimson",
    },
    {
      id: 9,
      name: "Lesya Tinham",
      job: "Safety Technician IV",
      company: "Turner-Kuhlman",
      location: "Philippines",
      lastLogin: "2/21/2021",
      favoriteColor: "Maroon",
    },
    {
      id: 10,
      name: "Zaneta Tewkesbury",
      job: "VP Marketing",
      company: "Sauer LLC",
      location: "Chad",
      lastLogin: "6/23/2020",
      favoriteColor: "Green",
    },
    {
      id: 11,
      name: "Andy Tipple",
      job: "Librarian",
      company: "Hilpert Group",
      location: "Poland",
      lastLogin: "7/9/2020",
      favoriteColor: "Indigo",
    },
    {
      id: 12,
      name: "Sophi Biles",
      job: "Recruiting Manager",
      company: "Gutmann Inc",
      location: "Indonesia",
      lastLogin: "2/12/2021",
      favoriteColor: "Maroon",
    },
    {
      id: 13,
      name: "Florida Garces",
      job: "Web Developer IV",
      company: "Gaylord, Pacocha and Baumbach",
      location: "Poland",
      lastLogin: "5/31/2020",
      favoriteColor: "Purple",
    },
    {
      id: 14,
      name: "Maribeth Popping",
      job: "Analyst Programmer",
      company: "Deckow-Pouros",
      location: "Portugal",
      lastLogin: "4/27/2021",
      favoriteColor: "Aquamarine",
    },
    {
      id: 15,
      name: "Moritz Dryburgh",
      job: "Dental Hygienist",
      company: "Schiller, Cole and Hackett",
      location: "Sri Lanka",
      lastLogin: "8/8/2020",
      favoriteColor: "Crimson",
    },
    {
      id: 16,
      name: "Reid Semiras",
      job: "Teacher",
      company: "Sporer, Sipes and Rogahn",
      location: "Poland",
      lastLogin: "7/30/2020",
      favoriteColor: "Green",
    },
    {
      id: 17,
      name: "Alec Lethby",
      job: "Teacher",
      company: "Reichel, Glover and Hamill",
      location: "China",
      lastLogin: "2/28/2021",
      favoriteColor: "Khaki",
    },
    {
      id: 18,
      name: "Aland Wilber",
      job: "Quality Control Specialist",
      company: "Kshlerin, Rogahn and Swaniawski",
      location: "Czech Republic",
      lastLogin: "9/29/2020",
      favoriteColor: "Purple",
    },
    {
      id: 19,
      name: "Teddie Duerden",
      job: "Staff Accountant III",
      company: "Pouros, Ullrich and Windler",
      location: "France",
      lastLogin: "10/27/2020",
      favoriteColor: "Aquamarine",
    },
    {
      id: 20,
      name: "Lorelei Blackstone",
      job: "Data Coordinator",
      company: "Witting, Kutch and Greenfelder",
      location: "Kazakhstan",
      lastLogin: "6/3/2020",
      favoriteColor: "Red",
    },
  ],
};
