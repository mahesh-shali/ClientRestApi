import { Dispatch, SetStateAction, useEffect } from "react";

export const useHandleSidebarResize = (
  setIsSidebarVisible: Dispatch<SetStateAction<boolean>>
) => {
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1280) {
        setIsSidebarVisible(false); // Auto-hide sidebar on smaller screens
      } else {
        setIsSidebarVisible(true); // Show sidebar on larger screens
      }
    };

    // Initialize resize listener
    handleResize();
    window.addEventListener("resize", handleResize);

    // Cleanup resize listener
    return () => window.removeEventListener("resize", handleResize);
  }, [setIsSidebarVisible]);
};
