import { useTitle } from "@/hooks/useTitle";
import { fetchCountries } from "@/utils/statics";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Register = () => {
  useTitle("Register");
  const [countries, setCountries] = useState<any[]>([]);
  const [selectedCode, setSelectedCode] = useState<string>("+1");
  const [selectedFlag, setSelectedFlag] = useState<string>(
    "https://flagcdn.com/w320/us.png"
  );
  const [selectedCountry, setSelectedCountry] = useState<string>("USA");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Fetch countries data on component mount
  useEffect(() => {
    const getCountries = async () => {
      const countryData = await fetchCountries();
      setCountries(countryData);
    };
    getCountries();
  }, []);

  const handleCountrySelect = (code: string, flag: string, country: string) => {
    setSelectedCode(code);
    setSelectedFlag(flag);
    setSelectedCountry(country);
    setIsDropdownOpen(false);
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <div className="card w-full max-w-sm shadow-xl">
          <div className="card-body ">
            <h2 className="text-2xl font-bold text-center mb-4 text-black">
              Register
            </h2>

            <form>
              {/* Name Input */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text text-black">Full Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="input input-bordered bg-white text-black"
                />
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
                />
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
                />
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
                      <div className="flex items-center">
                        <div className="flex items-center space-x-1">
                          <img
                            src={selectedFlag}
                            alt="country flag"
                            className="w-4 h-4"
                          />
                          <span>{selectedCode}</span> {/* Country code */}
                          <span>{selectedCountry}</span>
                        </div>
                      </div>
                      <span className="ml-5">▼</span>
                    </div>

                    {isDropdownOpen && (
                      <ul className="absolute z-10 w-full flex flex-col bg-white border border-gray-300 shadow-lg rounded-md mt-1 max-h-60 overflow-y-auto scrollbar-hide">
                        {countries.map((country, index) => (
                          <li
                            key={index}
                            className="p-2 flex items-center cursor-pointer hover:bg-gray-200"
                            onClick={() =>
                              handleCountrySelect(
                                country.idd.root,
                                country.flags.png,
                                country.cca3
                              )
                            }
                          >
                            <img
                              src={country.flags.png}
                              alt={country.cca3}
                              className="w-6 h-4 mr-2"
                            />
                            <span className="text-xs">{country.idd.root} </span>
                            <span className="text-xs">{country.cca3}</span>
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
                    pattern="^\d{3}-\d{3}-\d{4}$"
                    required
                  />
                </div>

                <label className="label">
                  <span className="label-text-alt text-xs text-black">
                    Format: +1 123-456-7890
                  </span>
                </label>
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

            {/* Divider */}
            <div className="divider">OR</div>

            {/* Social Register Buttons */}
            <div className="flex flex-col gap-2">
              <button className="btn btn-outline btn-accent">
                Register with Google
              </button>
              <button className="btn btn-outline btn-info">
                Register with Facebook
              </button>
            </div>

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
    </>
  );
};
