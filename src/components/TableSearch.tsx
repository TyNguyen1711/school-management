import Image from "next/image";
import React from "react";

const TableSearch = () => {
  return (
    <div className="w-full md:w-auto flex items-center gap-3 px-3 py-2 bg-transparent border border-gray-300 rounded-[100px]">
      <Image src="/search.png" alt="Search" width={16} height={16} />
      <input type="text" placeholder="Search..." className="outline-none" />
    </div>
  );
};

export default TableSearch;
