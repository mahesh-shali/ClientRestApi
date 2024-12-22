import { useTitle } from "@/hooks/useTitle";
import React from "react";
import { Link } from "react-router-dom";

export const Login = () => {
  useTitle("Login");
  return (
    <>
      <div>Login Page</div>
      <Link to="/">Go to Index</Link>
    </>
  );
};
