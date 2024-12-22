import React from "react";
import { Link } from "react-router-dom";
import { useTitle } from "../hooks/useTitle";

export const Home: React.FC = () => {
  useTitle("Home");

  return (
    <div>
      <h1>Home Page</h1>
      <Link to="/login">Go to Login Page</Link>
    </div>
  );
};
