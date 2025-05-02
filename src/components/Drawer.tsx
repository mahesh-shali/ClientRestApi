import React from "react";

interface DrawerProps {
  isOpen: boolean;
  closeDrawer: () => void;
  title: string;
  children: React.ReactNode;
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  closeDrawer,
  title,
  children,
}) => {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-800 opacity-50 z-40"
          onClick={closeDrawer}
        ></div>
      )}

      <div
        className={`fixed top-0 right-0 h-full bg-white transition-all duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } w-[70%] z-50 shadow-lg`}
      >
        <div className="flex justify-between p-4">
          <h2>{title}</h2>
          <span
            onClick={closeDrawer}
            className="text-xl font-bold cursor-pointer"
          >
            ✖
          </span>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </>
  );
};
