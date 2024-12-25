// src/components/Navbar.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const Navbar = () => {
  const { user, isLoggedIn, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white p-4">
      <div className="container mx-auto flex justify-between items-center no-underline">
        <Link to="/" className="text-black text-2xl font-semibold">
          RestApi
        </Link>

        <div className="hidden md:flex space-x-4">
          <Link to="/" className="text-black hover:text-gray-400">
            Home
          </Link>

          {isLoggedIn ? (
            <div>
              <button onClick={logout} className="text-black">
                Logout
              </button>
            </div>
          ) : (
            <div>
              <Link to="/login" className="text-black">
                Log in
              </Link>
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
        } md:hidden bg-gray-800 text-white space-y-4 py-4 px-6`}
      >
        <Link to="/" className="block hover:text-gray-400">
          Home
        </Link>
        {isLoggedIn ? (
          <div>
            <button onClick={logout} className="block hover:text-gray-400">
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login" className="block hover:text-gray-400">
            Log in
          </Link>
        )}
      </div>
    </nav>
  );
};
