import Image from "next/image";
import React from "react";

const UserCard = ({ type }: { type: string }) => {
  return (
    <div className="rounded-2xl odd:bg-[#CFCEFF] even:bg-[#FAE27C] p-4 flex-1">
      <div className="font-bold text-lg mb-2 flex flex-col">
        <div className="flex items-center gap-2 justify-between">
          <div className="text-[10px] bg-white px-2 py-1 rounded-full text-green-600">
            2024/25
          </div>
          <Image src="/more.png" alt="more" width={24} height={24} />
        </div>
        <div className="text-2xl font-semibold my-4">1,234</div>
        <div className="capitalize text-sm font-medium text-gray-600">
          {type}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
