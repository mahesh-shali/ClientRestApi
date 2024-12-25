import { Navbar } from "@/components/Navbar";
import Preloading from "@/contexts/Preloading";
import React, { useEffect, useState } from "react";

export const AdminSettings = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <div>
        {isLoading ? (
          <Preloading />
        ) : (
          <div>
            <Navbar />
            <h1>Hello Settings</h1>
          </div>
        )}
      </div>
    </>
  );
};
