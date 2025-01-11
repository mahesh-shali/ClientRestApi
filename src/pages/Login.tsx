import { useState } from "react";
import axios from "axios";
import { useTitle } from "../hooks/useTitle";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { getIpAddress, getOsName, getBrowserInfo } from "../utils/statics";

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
      // Get device info after successful login
      const ip = await getIpAddress();
      const userAgent = navigator.userAgent;
      const platform = navigator.platform;
      const browserInfo = getBrowserInfo(userAgent);
      const osName = getOsName(platform);

      const deviceDetails = {
        ip,
        browser: browserInfo.browserName,
        browserVersion: browserInfo.browserVersion,
        os: osName,
      };

      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_API_URL}/api/Auth/login`,
        {
          emailOrUsername,
          password,
          deviceDetails: {
            ip,
            browser: browserInfo.browserName,
            browserVersion: browserInfo.browserVersion,
            os: osName,
          },
        }
      );

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("tokenExpiration", response.data.expiration);
        localStorage.setItem("device", JSON.stringify(deviceDetails));

        setResponseMessage("Login successful!");
        setErrorMessages({});

        // Redirect user based on their role
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
      <div className="flex items-center justify-center min-h-screen">
        <div className="card w-full max-w-sm shadow-xl">
          <div className="card-body">
            <h2 className="text-2xl font-bold text-center mb-4 text-black">
              Login
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text text-black">
                    Email or Username
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your email"
                  className="input input-bordered bg-white text-black"
                  value={emailOrUsername}
                  onChange={(e) => {
                    setEmailOrUsername(e.target.value);
                    handleFieldChange("EmailOrUsername");
                  }}
                />
                {errorMessages.EmailOrUsername && (
                  <div className="error text-red-800">
                    {errorMessages.EmailOrUsername}
                  </div>
                )}
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text text-black">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="input input-bordered bg-white text-black"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    handleFieldChange("Password");
                  }}
                />
                {errorMessages.Password && (
                  <div className="error text-red-800">
                    {errorMessages.Password}
                  </div>
                )}
              </div>

              <div className="form-control mt-4">
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </div>
            </form>

            {responseMessage && <div>{responseMessage}</div>}

            {errorMessages.credentials && (
              <div className="error text-red-800">
                {errorMessages.credentials}
              </div>
            )}
            {/* <div className="divider">OR</div>
            <div className="flex flex-col gap-2">
              <button className="btn btn-outline btn-accent">
                Login with Google
              </button>
              <button className="btn btn-outline btn-info">
                Login with Facebook
              </button>
            </div> */}

            {/* Sign Up Redirect */}
            <p className="text-center mt-4 text-sm">
              Don’t have an account?{" "}
              <Link to="/register" className="text-primary hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
