import Image from "next/image";
import React from "react";
import CountChart from "./CountChart";
import { prisma } from "@/libs/prisma";

const CountChartContainer = async () => {
  const data = await prisma.student.groupBy({
    by: ["sex"],
    _count: true,
  });
  console.log(1000);
  console.log(data);
  const boys = data.find((item) => item.sex === "MALE")?._count || 0;
  const girls = data.find((item) => item.sex === "FEMALE")?._count || 0;

  return (
    <div className="bg-white rounded-xl w-full h-full">
      <div className="flex items-center justify-between p-4">
        <h1 className="text-lg font-semibold">Student</h1>
        <Image src="/moreDark.png" alt="more" width={24} height={24} />
      </div>
      <CountChart boys={boys} girls={girls} />
      <div className="flex justify-center gap-15 p-4">
        <div className="flex flex-col items-center">
          <div className="w-5 h-5 bg-[#C3EBFA] rounded-full"></div>
          <h1 className="font-bold">{boys}</h1>
          <h2 className="text-xs text-gray-500 capitalize">
            Boys ({Math.round((boys / (boys + girls)) * 100)}%)
          </h2>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-5 h-5 bg-[#FAE27C] rounded-full"></div>
          <h1 className="font-bold">{girls}</h1>
          <h2 className="text-xs text-gray-500 capitalize">
            Boys ({Math.round((girls / (boys + girls)) * 100)}%)
          </h2>
        </div>
      </div>
    </div>
  );
};

export default CountChartContainer;
