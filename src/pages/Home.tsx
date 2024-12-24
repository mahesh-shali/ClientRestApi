import React from "react";
import { Link } from "react-router-dom";
import { useTitle } from "../hooks/useTitle";
import { Navbar } from "../components/Navbar";

export const Home: React.FC = () => {
  useTitle("Home");

  return (
    <div>
      <Navbar />
      <h1>Home Page</h1>
      <Link to="/login">Go to Login Page</Link>
    </div>
  );
};
