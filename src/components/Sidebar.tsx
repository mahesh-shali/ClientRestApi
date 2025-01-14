import { useState, useEffect, SetStateAction } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { mainMenu, mainMenu1, mainMenu2, logoMap } from "../utils/statics";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Sidebar = () => {
  const { user, isLoggedIn, logout } = useAuth();
  const location = useLocation();

  // State for active menus
  const [activeIndex, setActiveIndex] = useState<string | null>(null);

  const [activeSubmenuIndex, setActiveSubmenuIndex] = useState<string | null>(
    null
  );
  const [_activeNestedSubmenuIndex, setActiveNestedSubmenuIndex] = useState<
    string | null
  >(null);

  // Effect to set active menu based on route
  useEffect(() => {
    mainMenu.forEach((menu) => {
      if (menu.submenus) {
        menu.submenus.forEach((submenu) => {
          if (submenu.route === location.pathname) {
            setActiveIndex(menu.id);
            setActiveSubmenuIndex(submenu.id);
          }
          if (submenu.submenus) {
            submenu.submenus.forEach((nested) => {
              if (nested.route === location.pathname) {
                setActiveIndex(menu.id);
                setActiveSubmenuIndex(submenu.id);
                setActiveNestedSubmenuIndex(nested.id);
              }
            });
          }
        });
      }
    });
  }, [location]);

  useEffect(() => {
    mainMenu1.forEach((menu) => {
      if (menu.submenus) {
        menu.submenus.forEach((submenu) => {
          if (submenu.route === location.pathname) {
            setActiveIndex(menu.id);
            setActiveSubmenuIndex(submenu.id);
          }
          if (submenu.submenus) {
            submenu.submenus.forEach((nested) => {
              if (nested.route === location.pathname) {
                setActiveIndex(menu.id);
                setActiveSubmenuIndex(submenu.id);
                setActiveNestedSubmenuIndex(nested.id);
              }
            });
          }
        });
      }
    });
  }, [location]);

  useEffect(() => {
    mainMenu2.forEach((menu) => {
      if (menu.submenus) {
        menu.submenus.forEach((submenu) => {
          if (submenu.route === location.pathname) {
            setActiveIndex(menu.id);
            setActiveSubmenuIndex(submenu.id);
          }
          if (submenu.submenus) {
            submenu.submenus.forEach((nested) => {
              if (nested.route === location.pathname) {
                setActiveIndex(menu.id);
                setActiveSubmenuIndex(submenu.id);
                setActiveNestedSubmenuIndex(nested.id);
              }
            });
          }
        });
      }
    });
  }, [location]);

  // Toggle main menu
  const toggleMenu = (index: SetStateAction<string | null>) => {
    setActiveIndex(activeIndex === index ? null : index);
    setActiveSubmenuIndex(null);
    setActiveNestedSubmenuIndex(null);
  };

  // Toggle submenu
  const toggleSubmenu = (index: SetStateAction<string | null>) => {
    setActiveSubmenuIndex(activeSubmenuIndex === index ? null : index);
    setActiveNestedSubmenuIndex(null);
  };

  // Utility to check active route
  const isActiveRoute = (route: string | undefined) =>
    location.pathname === route;

  return (
    <div className="w-64 text-base-content shadow-md flex flex-col h-[93vh]">
      {user.role === "superAdmin" && (
        <ul className="menu p-4 flex-grow overflow-y-auto">
          {/* Dashboard */}
          <li>
            <Link
              to="/admin/dashboard"
              className={`cursor-pointer text-black rounded-md p-2 flex items-center ${
                activeIndex === null && isActiveRoute("/admin/dashboard")
                  ? "bg-blue-100 text-blue-800"
                  : "hover:bg-blue-50"
              }`}
              onClick={() => {
                setActiveIndex(null); // Reset menus when clicking Dashboard
                setActiveSubmenuIndex(null);
                setActiveNestedSubmenuIndex(null);
              }}
            >
              <span>
                <FontAwesomeIcon icon={logoMap.faChartLine} />
              </span>
              Dashboard
            </Link>
          </li>

          {/* Main Menus */}
          {mainMenu.map((item) => (
            <li key={item.id}>
              {/* Main Menu */}
              <div
                className={`cursor-pointer hover:bg-blue-50 text-black rounded-md p-2 flex items-center ${
                  activeIndex === item.id ? "bg-blue-100 text-blue-800" : ""
                }`}
                onClick={() => toggleMenu(item.id)} // Toggle Main Menu
              >
                <span>
                  {item.logo && (
                    <FontAwesomeIcon
                      icon={logoMap[item.logo as keyof typeof logoMap]}
                    />
                  )}
                </span>
                {item.name}
              </div>

              {/* Submenus */}
              {activeIndex === item.id && item.submenus && (
                <ul className="pl-4">
                  {item.submenus.map((submenu) => (
                    <li key={submenu.id}>
                      <div
                        className={`cursor-pointer hover:bg-blue-50 text-black rounded-md p-2 m-1 ${
                          activeSubmenuIndex === submenu.id
                            ? "bg-blue-100 text-blue-800"
                            : ""
                        }`}
                        onClick={() => toggleSubmenu(submenu.id)} // Toggle Submenu
                      >
                        {submenu.name}
                      </div>

                      {/* Nested Submenus */}
                      {activeSubmenuIndex === submenu.id &&
                        submenu.submenus && (
                          <ul className="pl-4">
                            {submenu.submenus.map((nestedSubmenu) => (
                              <li key={nestedSubmenu.id}>
                                <Link
                                  to={nestedSubmenu.route || "#"} // Fallback route
                                  className={`${
                                    isActiveRoute(nestedSubmenu.route || "#")
                                      ? "bg-blue-200 text-blue-800"
                                      : "hover:bg-blue-100"
                                  } cursor-pointer text-black rounded-md p-2 m-1`}
                                  onClick={() =>
                                    setActiveNestedSubmenuIndex(
                                      nestedSubmenu.id
                                    )
                                  }
                                >
                                  {nestedSubmenu.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}

      {user.role === "admin" && (
        <ul className="menu p-4 flex-grow overflow-y-auto">
          {/* Dashboard */}
          <li>
            <Link
              to="/admin/dashboard"
              className={`cursor-pointer text-black rounded-md p-2 flex items-center ${
                activeIndex === null && isActiveRoute("/admin/dashboard")
                  ? "bg-blue-100 text-blue-800"
                  : "hover:bg-blue-50"
              }`}
              onClick={() => {
                setActiveIndex(null); // Reset menus when clicking Dashboard
                setActiveSubmenuIndex(null);
                setActiveNestedSubmenuIndex(null);
              }}
            >
              <span>
                <FontAwesomeIcon icon={logoMap.faChartLine} />
              </span>
              Dashboard
            </Link>
          </li>

          {/* Main Menus */}
          {mainMenu1.map((item) => (
            <li key={item.id}>
              {/* Main Menu */}
              <div
                className={`cursor-pointer hover:bg-blue-50 text-black rounded-md p-2 flex items-center ${
                  activeIndex === item.id ? "bg-blue-100 text-blue-800" : ""
                }`}
                onClick={() => toggleMenu(item.id)} // Toggle Main Menu
              >
                <span>
                  {item.logo && (
                    <FontAwesomeIcon
                      icon={logoMap[item.logo as keyof typeof logoMap]}
                    />
                  )}
                </span>
                {item.name}
              </div>

              {/* Submenus */}
              {activeIndex === item.id && item.submenus && (
                <ul className="pl-4">
                  {item.submenus.map((submenu) => (
                    <li key={submenu.id}>
                      <div
                        className={`cursor-pointer hover:bg-blue-50 text-black rounded-md p-2 m-1 ${
                          activeSubmenuIndex === submenu.id
                            ? "bg-blue-100 text-blue-800"
                            : ""
                        }`}
                        onClick={() => toggleSubmenu(submenu.id)} // Toggle Submenu
                      >
                        {submenu.name}
                      </div>

                      {/* Nested Submenus */}
                      {activeSubmenuIndex === submenu.id &&
                        submenu.submenus && (
                          <ul className="pl-4">
                            {submenu.submenus.map((nestedSubmenu) => (
                              <li key={nestedSubmenu.id}>
                                <Link
                                  to={nestedSubmenu.route || "#"} // Fallback route
                                  className={`${
                                    isActiveRoute(nestedSubmenu.route || "#")
                                      ? "bg-blue-200 text-blue-800"
                                      : "hover:bg-blue-100"
                                  } cursor-pointer text-black rounded-md p-2 m-1`}
                                  onClick={() =>
                                    setActiveNestedSubmenuIndex(
                                      nestedSubmenu.id
                                    )
                                  }
                                >
                                  {nestedSubmenu.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}

      {user.role === "user" && (
        <ul className="menu p-4 flex-grow overflow-y-auto">
          {/* Dashboard */}
          <li>
            <Link
              to="/admin/dashboard"
              className={`cursor-pointer text-black rounded-md p-2 flex items-center ${
                activeIndex === null && isActiveRoute("/admin/dashboard")
                  ? "bg-blue-100 text-blue-800"
                  : "hover:bg-blue-50"
              }`}
              onClick={() => {
                setActiveIndex(null); // Reset menus when clicking Dashboard
                setActiveSubmenuIndex(null);
                setActiveNestedSubmenuIndex(null);
              }}
            >
              <span>
                <FontAwesomeIcon icon={logoMap.faChartLine} />
              </span>
              Dashboard
            </Link>
          </li>

          {/* Main Menus */}
          {mainMenu2.map((item) => (
            <li key={item.id}>
              {/* Main Menu */}
              <div
                className={`cursor-pointer hover:bg-blue-50 text-black rounded-md p-2 flex items-center ${
                  activeIndex === item.id ? "bg-blue-100 text-blue-800" : ""
                }`}
                onClick={() => toggleMenu(item.id)} // Toggle Main Menu
              >
                <span>
                  {item.logo && (
                    <FontAwesomeIcon
                      icon={logoMap[item.logo as keyof typeof logoMap]}
                    />
                  )}
                </span>
                {item.name}
              </div>

              {/* Submenus */}
              {activeIndex === item.id && item.submenus && (
                <ul className="pl-4">
                  {item.submenus.map((submenu) => (
                    <li key={submenu.id}>
                      <div
                        className={`cursor-pointer hover:bg-blue-50 text-black rounded-md p-2 m-1 ${
                          activeSubmenuIndex === submenu.id
                            ? "bg-blue-100 text-blue-800"
                            : ""
                        }`}
                        onClick={() => toggleSubmenu(submenu.id)} // Toggle Submenu
                      >
                        {submenu.name}
                      </div>

                      {/* Nested Submenus */}
                      {activeSubmenuIndex === submenu.id &&
                        submenu.submenus && (
                          <ul className="pl-4">
                            {submenu.submenus.map((nestedSubmenu) => (
                              <li key={nestedSubmenu.id}>
                                <Link
                                  to={nestedSubmenu.route || "#"} // Fallback route
                                  className={`${
                                    isActiveRoute(nestedSubmenu.route || "#")
                                      ? "bg-blue-200 text-blue-800"
                                      : "hover:bg-blue-100"
                                  } cursor-pointer text-black rounded-md p-2 m-1`}
                                  onClick={() =>
                                    setActiveNestedSubmenuIndex(
                                      nestedSubmenu.id
                                    )
                                  }
                                >
                                  {nestedSubmenu.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}

      {/* Logout Button */}
      <div className="p-4 bg-white">
        {isLoggedIn && (
          <button className="btn btn-error w-full" onClick={logout}>
            Logout
          </button>
        )}
      </div>
    </div>
  );
};
