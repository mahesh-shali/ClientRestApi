// src/contexts/AuthContext.tsx
import axios from "axios";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Define context type
interface AuthContextProps {
  user: any;
  isLoggedIn: boolean;
  logout: () => void;
  loading: boolean; // Loading state to prevent routes rendering before auth is checked
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state initially set to true
  const navigate = useNavigate(); // Ensure useNavigate is used here within the Router context

  useEffect(() => {
    const token = localStorage.getItem("token");
    const tokenExpiration = localStorage.getItem("tokenExpiration");

    let storedUser = {};

    try {
      const userData = localStorage.getItem("user");
      if (userData) {
        storedUser = JSON.parse(userData);
      }
    } catch (error) {
      console.error("Error parsing user data from localStorage:", error);
    }

    if (token && storedUser && tokenExpiration) {
      const expirationTime = new Date(tokenExpiration).getTime();
      const currentTime = new Date().getTime();

      if (expirationTime > currentTime) {
        setUser(storedUser);
        setIsLoggedIn(true);
      } else {
        localStorage.removeItem("device");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("tokenExpiration");
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
    }

    setLoading(false);
  }, []);

  const logout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.warn("No token found.");
        return;
      }

      await axios.post(
        `${import.meta.env.VITE_SERVER_API_URL}/api/Auth/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      localStorage.removeItem("device");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("tokenExpiration");
      setUser(null);
      setIsLoggedIn(false);
      navigate("/login");
    } catch (error: any) {
      console.error(
        "Logout failed:",
        error.response?.data?.message || error.message
      );
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
