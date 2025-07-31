import React from "react";

const Announcements = () => {
  return (
    <div className="flex flex-col gap-4 p-4 bg-white rounded-xl mt-8">
      <div className="flex items-center justify-between mb-1">
        <h1 className="text-xl font-semibold">Announcements</h1>
        <p className="text-gray-400 text-xs">ViewAll</p>
      </div>
      <div className="flex flex-col gap-4">
        <div className="bg-[#EDF9FD] rounded-md p-4">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold mb-1">Lorem ipsum dolor sit</h2>
            <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">
              2025-01-01
            </span>
          </div>
          <p className="text-sm text-gray-400">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua?
          </p>
        </div>

        <div className="bg-[#F1F0FF] rounded-md p-4">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold mb-1">Lorem ipsum dolor sit</h2>
            <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">
              2025-01-01
            </span>
          </div>
          <p className="text-sm text-gray-400">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua?
          </p>
        </div>

        <div className="bg-[#FEFCE8] rounded-md p-4">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold mb-1">Lorem ipsum dolor sit</h2>
            <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">
              2025-01-01
            </span>
          </div>
          <p className="text-sm text-gray-400">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua?
          </p>
        </div>
      </div>
    </div>
  );
};

export default Announcements;
