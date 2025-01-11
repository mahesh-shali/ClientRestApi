import { useTitle } from "@/hooks/useTitle";
import { fetchCountries } from "../utils/statics";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getIpAddress, getBrowserInfo, getOsName } from "../utils/statics";
import axios from "axios";

export const Register = () => {
  useTitle("Register");
  const [countries, setCountries] = useState<any[]>([]);
  const [ip, setIp] = useState<string>(""); // changed to string instead of array
  // const [selectedCode, setSelectedCode] = useState<string>("+1");
  const [selectedFlag, setSelectedFlag] = useState<string>(
    "https://flagcdn.com/w320/us.png"
  );
  const [selectedCountry, setSelectedCountry] = useState<string>("USA");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [responseMessage, setResponseMessage] = useState<string>("");
  const [errorMessages, setErrorMessages] = useState<any>({});
  const navigate = useNavigate();
  const userAgent = navigator.userAgent;
  const platform = navigator.platform;
  // const [isChecked, setIsChecked] = useState(false);
  const browserInfo = getBrowserInfo(userAgent);
  const osName = getOsName(platform);
  // const [validationResult, setValidationResult] = useState<string | null>(null);
  // const [error, setError] = useState<string | null>(null);
  const [errorEmail, setErrorEmail] = useState("");
  // const [jwtToken, setJwtToken] = useState<string | null>(null);

  const emailRegex =
    /^[a-zA-Z0-9._%+-]{1,64}@[a-zA-Z0-9.-]{1,253}\.[a-zA-Z]{2,20}$/;

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    // Validate the email format
    if (!emailRegex.test(value)) {
      setErrorEmail("Please enter a valid email address.");
    } else {
      setErrorEmail("");
    }

    handleFieldChange("Email");
  };

  // Fetch countries data on component mount
  useEffect(() => {
    const getCountries = async () => {
      const countryData = await fetchCountries();
      setCountries(countryData);
    };
    getCountries();
  }, []);

  useEffect(() => {
    const getIp = async () => {
      const ipAddress = await getIpAddress();
      setIp(ipAddress);
    };
    getIp();
  }, []);

  const handleCountrySelect = (
    _code: string,
    flag: string,
    country: string
  ) => {
    // setSelectedCode(code); //+91
    setSelectedFlag(flag);
    setSelectedCountry(country);
    setIsDropdownOpen(false);
  };

  // const formatPhoneNumber = (value) => {
  //   const cleaned = value.replace(/\D/g, "");
  //   if (cleaned.length <= 3) {
  //     return cleaned;
  //   } else if (cleaned.length <= 6) {
  //     return `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
  //   } else {
  //     return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(
  //       6,
  //       10
  //     )}`;
  //   }
  // };

  // const handlePhoneChange = (e) => {
  //   // const formattedPhone = formatPhoneNumber(e.target.value);
  //   setPhone(formattedPhone);
  // };

  // const validatePhoneNumber = async () => {
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:5151/api/Auth/validate-phone",
  //       {
  //         phone,
  //         selectedCountry,
  //       }
  //     );
  //     if (response.status === 200) {
  //       if (response.data.Valid === true) {
  //         setValidationResult(`✅ Valid: ${response.data}`);
  //       }
  //       setError(null);
  //       return true;
  //     } else {
  //       setValidationResult(null);
  //       setError("Failed to validate the phone number.");
  //       return false; // Validation failed
  //     }
  //   } catch (err: any) {
  //     setValidationResult(null);
  //     setError("Failed to validate the phone number.");
  //     return false; // Validation failed
  //   }
  // };

  // useEffect(() => {
  //   if (phone && selectedCountry) {
  //     validatePhoneNumber();
  //   }
  // }, [phone, selectedCountry]);

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();
    // const isPhoneValid = await validatePhoneNumber();
    // if (!isPhoneValid) {
    //   return; // Stop further execution if validation fails
    // }                                                             //api limit exceeded try feb 1
    setErrorMessages({});
    setResponseMessage("");

    try {
      // const ip = await getIpAddress();
      // const userAgent = navigator.userAgent;
      // const platform = navigator.platform;
      // const browserInfo = getBrowserInfo(userAgent);
      // const osName = getOsName(platform);

      const deviceDetails = {
        ip,
        browser: browserInfo.browserName,
        browserVersion: browserInfo.browserVersion,
        os: osName,
      };

      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_API_URL}/api/Auth/register`,
        {
          name,
          email,
          password,
          selectedCountry,
          phone,
          ip,
          browserInfo,
          osName,
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

  const handleGoogleLogin = () => {
    window.location.href = `${
      import.meta.env.VITE_SERVER_API_URL
    }/api/Auth/login-google`;
  };

  useEffect(() => {
    const fetchGoogleCallback = async () => {
      try {
        // No need for this GET request to the callback URL, it's handled by Google redirection
        const token = localStorage.getItem("token");
        if (token) {
          console.log("Login Successful:", token);
          localStorage.setItem("token", token); // Store token in localStorage or sessionStorage
          navigate("/user/dashboard"); // Redirect to dashboard or a desired route
        } else {
          navigate("/register");
        }
      } catch (error) {
        console.error("Error during Google Callback:", error);
        navigate("/register");
      }
    };

    fetchGoogleCallback();
  }, [navigate]);

  const handleFieldChange = (field: string) => {
    setErrorMessages((prevErrors: any) => ({
      ...prevErrors,
      [field]: undefined,
    }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="card w-full max-w-sm shadow-xl">
        <div className="card-body ">
          <h2 className="text-2xl font-bold text-center mb-4 text-black">
            Register
          </h2>

          <form onSubmit={handleRegister}>
            {/* Name Input */}
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text text-black">Full Name</span>
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="input input-bordered bg-white text-black"
                value={name}
                onChange={(e) => {
                  setName(e.target.value.slice(0, 30)); // Restrict to 30 characters
                  handleFieldChange("Name");
                }}
                maxLength={30} // Limit input to 30 characters
              />
              {errorMessages.Name && (
                <div className="error text-red-800">{errorMessages.Name}</div>
              )}
            </div>

            {/* Email Input */}
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text text-black">Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered bg-white text-black"
                value={email}
                onChange={handleEmailChange}
              />
              {/* Show error message if the email is invalid */}
              {errorEmail && <div className="text-red-500">{errorEmail}</div>}
              {errorMessages.Email && (
                <div className="error text-red-800">{errorMessages.Email}</div>
              )}
              {errorMessages.email && (
                <div className="error text-red-800">{errorMessages.email}</div>
              )}
            </div>

            {/* Password Input */}
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
              {errorMessages.password && (
                <div className="error text-red-800">
                  {errorMessages.password}
                </div>
              )}
            </div>

            {/* Phone Input */}
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text text-black">Phone Number</span>
              </label>

              <div className="flex space-x-1 relative ">
                {/* Country Code Dropdown */}
                <div className="relative w-1/3">
                  <div
                    className="input input-bordered bg-white text-black w-full flex items-center justify-between pl-2 pr-10 cursor-pointer"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={selectedFlag}
                        alt="country flag"
                        className="w-4 h-4"
                      />
                      <span>{selectedCountry}</span>
                      {/* <span>{selectedCode}</span> Country code */}
                    </div>
                    <span className="ml-5">▼</span>
                  </div>

                  {isDropdownOpen && (
                    <ul className="absolute z-10 w-full flex flex-col bg-white border border-gray-300 shadow-lg rounded-md mt-1 max-h-60 overflow-y-auto scrollbar-hide">
                      {[...countries]
                        .filter(
                          (country) =>
                            country.name?.common &&
                            country.flags?.png &&
                            country.cca2
                        )
                        .sort((a, b) =>
                          a.name.common.localeCompare(b.name.common)
                        )
                        .map((country, index) => (
                          <li
                            key={index}
                            className="p-2 flex items-center cursor-pointer hover:bg-gray-200"
                            onClick={() =>
                              handleCountrySelect(
                                country.idd.root,
                                country.flags.png,
                                country.cca2
                              )
                            }
                          >
                            <img
                              src={country.flags.png}
                              alt={country.cca2}
                              className="w-6 h-4 mr-2"
                            />
                            <span className="text-xs">{country.cca2}</span>
                          </li>
                        ))}
                    </ul>
                  )}
                </div>

                {/* Phone Number Field */}
                <input
                  type="tel"
                  placeholder="Enter phone number"
                  className="input input-bordered bg-white text-black w-3/4"
                  value={phone}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    setPhone(value.slice(0, 10));
                    handleFieldChange("Phone");
                  }}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={10}
                  title="Only numbers are allowed"
                />
              </div>

              <label className="label">
                <span className="label-text-alt text-xs text-black">
                  Format: +91 1234567890
                </span>
              </label>
              {errorMessages.Phone && (
                <div className="error text-red-800">{errorMessages.Phone}</div>
              )}
              {errorMessages.phone && (
                <div className="error text-red-800">{errorMessages.phone}</div>
              )}
              {/* {validationResult && (
                <p className="text-green-500 mt-2">{validationResult}</p>
              )} */}
            </div>

            {/* Terms and Conditions Checkbox */}
            <div className="form-control mb-4">
              <label className="label cursor-pointer">
                <input
                  type="checkbox"
                  className="checkbox border-black bg-white text-black hover:bg-gray-200 focus:ring-2 focus:ring-blue-500 rounded-md"
                  required
                />
                <span className="label-text ml-2 text-black bg-white">
                  I agree to the Terms & Conditions
                </span>
              </label>
            </div>

            {/* Register Button */}
            <div className="form-control mt-4">
              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </div>
          </form>
          {responseMessage && <div>{responseMessage}</div>}

          {/* {errorMessages.credentials && (
            <div className="error text-red-800">
              {errorMessages.credentials}
            </div>
          )} */}

          <div className="divider">OR</div>

          {/* Social Register Buttons */}
          {/* <div className="flex flex-col gap-2">
            <button
              onClick={handleGoogleLogin}
              className="btn btn-outline btn-accent"
            >
              Register with Google
            </button>
            <button className="btn btn-outline btn-info">
              Register with Facebook
            </button>
          </div> */}

          {/* Login Redirect */}
          <p className="text-center mt-4 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
