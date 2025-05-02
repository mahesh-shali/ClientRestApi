import React from "react";

interface AddUserProps {
  isOpen: boolean;
  closeDrawer: () => void;
}

export const UserRights: React.FC<AddUserProps> = ({ isOpen, closeDrawer }) => {
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
        <div className="flex justify-end p-4">
          <span
            onClick={closeDrawer}
            className="text-xl font-bold cursor-pointer"
          >
            ✖
          </span>
        </div>
        <div className="p-4">
          <ul>
            <li>UserRights Item 1</li>
            <li>UserRights Item 2</li>
          </ul>
        </div>
      </div>
    </>
  );
};
