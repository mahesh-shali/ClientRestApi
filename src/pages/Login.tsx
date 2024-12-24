import { useState } from "react";
import axios from "axios";
import { useTitle } from "../hooks/useTitle";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const Login = () => {
  useTitle("Login");
  const [emailOrUsername, setEmailOrUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [responseMessage, setResponseMessage] = useState<string>("");
  const [errorMessages, setErrorMessages] = useState<any>({});
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMessages({}); // Clear previous error messages
    setResponseMessage(""); // Clear previous response messages

    try {
      const response = await axios.post(
        "http://localhost:5151/api/Auth/login",
        {
          emailOrUsername,
          password,
        }
      );

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("tokenExpiration", response.data.expiration);

        setResponseMessage("Login successful!");
        setErrorMessages({});

        if (response.data.user.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/user/dashboard");
        }
      }
    } catch (error: any) {
      if (error.response && error.response.data) {
        if (error.response.data.errors) {
          setErrorMessages(error.response.data.errors);
        } else if (error.response.data.message) {
          setResponseMessage(error.response.data.message);
        }
      } else {
        setResponseMessage("An unexpected error occurred. Please try again.");
      }
    }
  };

  const handleFieldChange = (field: string) => {
    setErrorMessages((prevErrors: any) => ({
      ...prevErrors,
      [field]: undefined,
    }));
  };

  return (
    <>
      <div>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email or Username</label>
            <input
              type="text"
              value={emailOrUsername}
              onChange={(e) => {
                setEmailOrUsername(e.target.value);
                handleFieldChange("EmailOrUsername");
              }}
            />
            {errorMessages.EmailOrUsername && (
              <div className="error">{errorMessages.EmailOrUsername}</div>
            )}
          </div>

          <div>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                handleFieldChange("Password");
              }}
            />
            {errorMessages.Password && (
              <div className="error">{errorMessages.Password}</div>
            )}
          </div>

          <button type="submit">Login</button>
        </form>

        {responseMessage && <div>{responseMessage}</div>}

        {errorMessages.credentials && (
          <div className="error">{errorMessages.credentials}</div>
        )}
      </div>
    </>
  );
};
