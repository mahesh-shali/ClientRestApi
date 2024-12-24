// src/contexts/AuthContext.tsx
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
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    const tokenExpiration = localStorage.getItem("tokenExpiration");

    if (token && storedUser && tokenExpiration) {
      const expirationTime = new Date(tokenExpiration).getTime();
      const currentTime = new Date().getTime();

      if (expirationTime > currentTime) {
        setUser(storedUser);
        setIsLoggedIn(true);
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("tokenExpiration");
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false); // If no token or user, log out
    }

    setLoading(false); // Set loading to false after authentication check
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("tokenExpiration");
    setUser(null);
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
