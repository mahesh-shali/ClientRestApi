import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

import {
  faWarehouse,
  faBoxesStacked,
  faCartShopping,
  faMoneyCheckDollar,
  faTools,
  faMagnifyingGlass,
  faPen,
  faTags,
  faChartLine,
  faUser,
  faFileAlt,
  faPlug,
  faWrench,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

// just added a comment
interface Permission {
  permissionId: number;
  permissionName: string;
  canRead: boolean;
  canWrite: boolean;
  canUpdate: boolean;
  canDelete: boolean;
  isVisible: boolean;
  isHidden: boolean;
  isDisabled: boolean;
  isRestricted: boolean;
}

export const Sidebar = () => {
  const { user, isLoggedIn, logout } = useAuth();
  const location = useLocation();
  const [_activeIndex, setActiveIndex] = useState<string | null>(null);
  const [permissions, setPermissions] = useState<Permission[]>([]);

  useEffect(() => {
    const storedPermissions = localStorage.getItem("permissions");

    if (storedPermissions) {
      const parsedPermissions = JSON.parse(storedPermissions);
      if (Array.isArray(parsedPermissions)) {
        setPermissions(parsedPermissions);
      }
      return;
    }

    const userString = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    const user = userString ? JSON.parse(userString) : null;
    const userId = user?.userId;
    const organizationId = user?.organizationId;
    const role = user?.role;

    if (userId && organizationId) {
      axios
        .get(
          `${
            import.meta.env.VITE_DEV_SERVER_API_URL
          }/api/${role}/get-permissions/organizationId/${organizationId}/userId/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          const userPermissions = response.data.users?.permissions || [];
          if (Array.isArray(userPermissions)) {
            setPermissions(userPermissions);
            localStorage.setItem(
              "permissions",
              JSON.stringify(userPermissions)
            );
          }
        })
        .catch((error) => console.error("Error fetching permissions:", error));
    } else {
      console.log("error fetching permissions");
    }
  }, []);

  const getPermissionCategories = (permissions: Permission[]) => {
    const categories = new Set<string>();

    permissions.forEach((permission) => {
      const permissionName = permission.permissionName;
      if (
        permissionName.toLowerCase().includes("cash flow") ||
        permissionName.toLowerCase().includes("human resource")
      ) {
        const category = permissionName.split(" ").slice(0, 2).join(" ");
        categories.add(category);
      } else {
        const category = permissionName.split(" ")[0];
        categories.add(category);
      }
    });

    return Array.from(categories);
  };

  const categories = getPermissionCategories(permissions);

  const getRoleConfig = (role: string) => {
    // @ts-ignore: MenuItem it is used for future
    type MenuItem = {
      title: string;
      route: string;
      icon?: IconDefinition;
    };

    switch (role) {
      case "user":
        return {
          dashboardRoute: "/u/dashboard",
          menuItems: [
            {
              title: "Dashboard",
              icon: faChartLine,
              route: "/u/dashboard",
            },
          ],
        };
      case "admin":
        return {
          dashboardRoute: "/a/dashboard",
          menuItems: [
            {
              title: "Dashboard",
              icon: faChartLine,
              route: "/a/dashboard",
            },
          ],
        };
      case "superAdmin":
        return {
          dashboardRoute: "/s/dashboard",
          menuItems: [
            {
              title: "Dashboard",
              icon: faChartLine,
              route: "/s/dashboard",
            },
          ],
        };
      default:
        return {
          dashboardRoute: "/u/dashboard",
          menuItems: [
            {
              title: "Dashboard",
              icon: faChartLine,
              route: "/u/dashboard",
            },
          ],
        };
    }
  };

  const currentRoleConfig = user?.role
    ? getRoleConfig(user.role)
    : getRoleConfig("user");

  const useActiveRoute = (route: string | undefined) => {
    const isActiveRoute = () => {
      const staticRoutes = ["/s/dashboard", "/a/dashboard", "/u/dashboard"];
      if (staticRoutes.includes(location.pathname)) {
        return location.pathname === route;
      } else {
        const currentPath = location.pathname.split("/")[2];
        return currentPath === route?.toLowerCase();
      }
    };
    return isActiveRoute();
  };

  const categoryIconMap: { [key: string]: IconDefinition } = {
    Master: faWarehouse,
    Sales: faTags,
    Outsourcing: faCartShopping,
    Production: faTools,
    Inventory: faBoxesStacked,
    Planning: faPen,
    "Cash Flow": faMoneyCheckDollar,
    Inspection: faMagnifyingGlass,
    Maintenance: faWrench,
    "Human Resource": faUser,
    Reports: faFileAlt,
    Utilities: faPlug,
  };

  return (
    <div className="w-64 text-base-content shadow-md flex flex-col h-[94vh]">
      <ul className="menu p-4 flex-grow overflow-y-auto">
        {currentRoleConfig.menuItems.map((menuItem) => (
          <li key={menuItem.route}>
            <Link
              to={menuItem.route}
              className={`cursor-pointer text-black rounded-md p-2 flex items-center ${
                useActiveRoute(menuItem.route)
                  ? "bg-blue-100 text-blue-800"
                  : "hover:bg-blue-50"
              }`}
              onClick={() => setActiveIndex(null)}
            >
              {menuItem.icon && (
                <FontAwesomeIcon
                  icon={menuItem.icon}
                  className="mr-2 text-blue-600"
                />
              )}
              {menuItem.title}
            </Link>
          </li>
        ))}

        {categories.map((category) => {
          const categoryPermissions = permissions.filter(
            (permission) =>
              permission.permissionName
                .toLowerCase()
                .includes(category.toLowerCase()) &&
              permission.isVisible &&
              !permission.isHidden
          );

          if (categoryPermissions.length > 0) {
            return (
              <li key={category} className="flex flex-row items-center mt-1">
                <Link
                  to={`/${user?.role
                    .charAt(0)
                    .toLowerCase()}/${category.toLowerCase()}`}
                  className={`cursor-pointer text-black rounded-md p-2 flex items-center ${
                    useActiveRoute(category.toLowerCase())
                      ? "bg-blue-100 text-blue-800 w-[100%]"
                      : "hover:bg-blue-50 w-[100%]"
                  }`}
                  onClick={() => {
                    setActiveIndex(null);
                  }}
                >
                  <FontAwesomeIcon
                    icon={categoryIconMap[category]}
                    className="mr-2 text-blue-600"
                  />
                  {category}
                </Link>
              </li>
            );
          }

          return null;
        })}
      </ul>

      {/* Logout Button */}
      <div className="p-4 bg-white">
        {isLoggedIn && (
          <Link
            to="/login"
            className="btn btn-error w-full text-center"
            onClick={logout}
          >
            Logout
          </Link>
        )}
      </div>
    </div>
  );
};
