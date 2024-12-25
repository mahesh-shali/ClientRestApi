import { Navbar } from "@/components/Navbar";
import Preloading from "@/contexts/Preloading";
import React, { useEffect, useState } from "react";

export const UserDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {isLoading ? (
        <Preloading />
      ) : (
        <div className="">
          <Navbar />
          <div className="container mx-auto flex ">
            <h1>Hello User</h1>
          </div>
        </div>
      )}
    </div>
  );
};
