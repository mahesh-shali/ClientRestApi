import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { useEffect, useState } from "react";

export const AddUser = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1280) {
        setIsSidebarVisible(false);
      } else {
        setIsSidebarVisible(true);
      }
    };

    // Initialize resize listener
    handleResize();
    window.addEventListener("resize", handleResize);

    // Cleanup resize listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };
  return (
    <>
      <div className="bg-white h-screen flex flex-col">
        {/* Navbar */}
        <Navbar
          toggleSidebar={toggleSidebar}
          isSidebarVisible={isSidebarVisible}
        />

        {/* Main Content */}
        <div className="flex flex-grow overflow-hidden">
          {/* Sidebar */}
          <div
            className={`w-64 text-base-content shadow-md flex flex-col ${
              isSidebarVisible ? "block" : "hidden"
            }`}
          >
            <Sidebar />
          </div>

          {/* Main Content Area */}
          <div className=" flex-grow p-6 bg-gray-100 overflow-auto scrollbar-hide rounded-3xl">
            <div className="flex flex-col">
              <div className="max-h-full">
                <label htmlFor="my-modal-3" className="btn btn-primary">
                  Add New Order
                </label>

                <input
                  type="checkbox"
                  id="my-modal-3"
                  className="modal-toggle"
                />
                <div className="modal">
                  <div className="modal-box">
                    <h2 className="text-xl">New Order</h2>
                    <form>
                      <input
                        type="text"
                        className="input input-bordered w-full my-2"
                        placeholder="Order ID"
                      />
                      <input
                        type="text"
                        className="input input-bordered w-full my-2"
                        placeholder="Customer Name"
                      />
                      <input
                        type="number"
                        className="input input-bordered w-full my-2"
                        placeholder="Amount"
                      />
                      <button
                        type="submit"
                        className="btn btn-primary w-full mt-4"
                      >
                        Submit
                      </button>
                    </form>
                    <div className="modal-action">
                      <label htmlFor="my-modal-3" className="btn">
                        Close
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
