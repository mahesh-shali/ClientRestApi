// src/components/Navbar.tsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import icon from "../assets/images/icon.png";
import { faUser } from "@fortawesome/free-light-svg-icons";

export const Navbar = ({ isSidebarVisible, toggleSidebar }) => {
  const { user, isLoggedIn, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="bg-white p-4 shadow-lg">
        <div className=" mx-auto flex justify-between items-center no-underline">
          <div className="flex items-center w-[14rem] justify-between">
            <div className="flex items-center">
              <img src={icon} alt="logo" style={{ width: 40 }} />
              <Link to="/" className="text-black text-2xl ml-2 font-semibold">
                Rove
              </Link>
            </div>

            <div>
              {isLoggedIn &&
                (() => {
                  const location = useLocation();
                  if (location.pathname !== "/") {
                    return (
                      <div className="ml-28 text-black cursor-pointer hidden md:block">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          strokeLinecap="round"
                          onClick={toggleSidebar}
                          strokeLinejoin="round"
                        >
                          <path d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                      </div>
                    );
                  }
                  return null; // Do not render anything if the path is "/"
                })()}
            </div>
          </div>

          <div className="hidden md:flex space-x-4">
            {user?.role === "admin" &&
              (() => {
                const location = useLocation();
                return (
                  <>
                    {location.pathname === "/" ? (
                      <Link
                        to="/admin/dashboard"
                        className="text-black hover:text-gray-400"
                      >
                        Dashboard
                      </Link>
                    ) : (
                      <Link to="/" className="text-black hover:text-gray-400">
                        Home
                      </Link>
                    )}

                    {location.pathname === "/admin/settings" ? (
                      <Link
                        to="/admin/dashboard"
                        className="text-black hover:text-gray-400"
                      >
                        Dashboard
                      </Link>
                    ) : (
                      <Link
                        to="/admin/settings"
                        className="text-black hover:text-gray-400"
                      >
                        Settings
                      </Link>
                    )}
                  </>
                );
              })()}

            {user?.role === "user" &&
              (() => {
                const location = useLocation();
                return (
                  <>
                    {location.pathname === "/" ? (
                      <Link
                        to="/user/dashboard"
                        className="text-black hover:text-gray-400"
                      >
                        Dashboard
                      </Link>
                    ) : (
                      <Link to="/" className="text-black hover:text-gray-400">
                        Home
                      </Link>
                    )}

                    {location.pathname === "/user/profile" ? (
                      <Link
                        to="/user/dashboard"
                        className="text-black hover:text-gray-400"
                      >
                        Dashboard
                      </Link>
                    ) : (
                      <Link
                        to="/user/profile"
                        className="text-black hover:text-gray-400"
                      >
                        Profile
                      </Link>
                    )}
                  </>
                );
              })()}

            {isLoggedIn ? (
              <div>
                <div
                  onClick={logout}
                  className="text-black bg-white cursor-pointer"
                >
                  <FontAwesomeIcon
                    icon={faArrowRightFromBracket}
                    className="mr-2"
                  />
                </div>
              </div>
            ) : (
              <div className="flex space-x-4 items-center">
                <Link to="" className="block text-black hover:text-gray-600">
                  About
                </Link>
                <Link to="" className="block text-black hover:text-gray-600">
                  Team
                </Link>
                <Link to="" className="block text-black hover:text-gray-600">
                  Contact Us
                </Link>
                <button className="rounded-full bg-white flex items-center">
                  <Link to="/register" className="text-black">
                    Get Started
                  </Link>
                </button>
                <button className="flex items-center rounded-full bg-white border border-green-200 hover:border-green-200 hover:bg-green-500 hover:text-white">
                  <Link to="/login" className="text-inherit">
                    Sign In
                  </Link>
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>

        <div
          className={`${
            isOpen ? "block" : "hidden"
          } md:hidden bg-gray-100 rounded-md mt-2 text-white flex flex-col space-y-4 py-4 px-6 `}
        >
          {user?.role === "admin" &&
            (() => {
              const location = useLocation();
              return (
                <>
                  {location.pathname === "/" ? (
                    <Link
                      to="/admin/dashboard"
                      className="text-black hover:text-gray-400"
                    >
                      Dashboard
                    </Link>
                  ) : (
                    <Link to="/" className="text-black hover:text-gray-400">
                      Home
                    </Link>
                  )}

                  {location.pathname === "/admin/settings" ? (
                    <Link
                      to="/admin/dashboard"
                      className="text-black hover:text-gray-400"
                    >
                      Dashboard
                    </Link>
                  ) : (
                    <Link
                      to="/admin/settings"
                      className="text-black hover:text-gray-400"
                    >
                      Settings
                    </Link>
                  )}
                </>
              );
            })()}

          {user?.role === "user" &&
            (() => {
              const location = useLocation();
              return (
                <>
                  {location.pathname === "/" ? (
                    <Link
                      to="/user/dashboard"
                      className="text-black hover:text-gray-400"
                    >
                      Dashboard
                    </Link>
                  ) : (
                    <Link to="/" className="text-black hover:text-gray-400">
                      Home
                    </Link>
                  )}

                  {location.pathname === "/user/profile" ? (
                    <Link
                      to="/user/dashboard"
                      className="text-black hover:text-gray-400"
                    >
                      Dashboard
                    </Link>
                  ) : (
                    <Link
                      to="/user/profile"
                      className="text-black hover:text-gray-400"
                    >
                      Profile
                    </Link>
                  )}
                </>
              );
            })()}
          {isLoggedIn ? (
            <div className="">
              <button
                onClick={logout}
                className="block text-white hover:text-black"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link to="" className="block text-black hover:text-gray-600">
                About
              </Link>
              <Link to="" className="block text-black hover:text-gray-600">
                Team
              </Link>
              <Link to="" className="block text-black hover:text-gray-600">
                Contact Us
              </Link>
              <div className="text-black hover:text-white">
                <button className="block hover:text-white">
                  <Link to="/login" className="text-inherit">
                    Login
                  </Link>
                </button>
              </div>
            </>
          )}
        </div>
      </nav>
    </>
  );
};
