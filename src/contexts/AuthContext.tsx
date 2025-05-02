import axios from "axios";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Define context type
interface AuthContextProps {
  user: any;
  isLoggedIn: boolean;
  logout: () => void;
  loading: boolean;
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
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const fetchUserData = () => {
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
        localStorage.removeItem("permissions");
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchUserData();
    const storageListener = (event: StorageEvent) => {
      if (
        event.key === "token" ||
        event.key === "tokenExpiration" ||
        event.key === "user"
      ) {
        fetchUserData();
      }
    };

    window.addEventListener("storage", storageListener);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener("storage", storageListener);
    };
  }, []); // The empty dependency array ensures that this runs only once on mount

  const logout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.warn("No token found.");
        return;
      }

      await axios.post(
        `${import.meta.env.VITE_DEV_SERVER_API_URL}/api/Auth/logout`,
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
      localStorage.removeItem("permissions");
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
