import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const Sidebar = () => {
  const { isLoggedIn, logout } = useAuth();
  return (
    <div className="w-64 text-base-content shadow-md flex flex-col h-screen">
      <ul className="menu p-4 flex-grow overflow-y-auto">
        <li>
          <Link to="/" className="hover:bg-base-300 rounded-md">
            🏠 Home
          </Link>
        </li>
        <li>
          <Link to="/dashboard" className="hover:bg-base-300 rounded-md">
            📊 Dashboard
          </Link>
        </li>
        <li>
          <Link to="/settings" className="hover:bg-base-300 rounded-md">
            ⚙️ Settings
          </Link>
        </li>
        <li>
          <Link to="/profile" className="hover:bg-base-300 rounded-md">
            👤 Profile
          </Link>
        </li>
      </ul>
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
