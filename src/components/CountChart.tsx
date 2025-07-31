"use client";
import { count } from "console";
import Image from "next/image";
import React from "react";
import {
  RadialBarChart,
  RadialBar,
  Legend,
  ResponsiveContainer,
} from "recharts";
const data = [
  { name: "Totals", count: 100, fill: "white" },
  {
    name: "Girls",
    count: 50,
    fill: "#FAE27C",
  },
  {
    name: "Boys",
    count: 50,
    fill: "#C3EBFA",
  },
];

const style = {
  top: "50%",
  right: 0,
  transform: "translate(0, -50%)",
  lineHeight: "24px",
};
const CountChart = () => {
  return (
    <div className="bg-white rounded-xl w-full h-full">
      <div className="flex items-center justify-between p-4">
        <h1 className="text-lg font-semibold">Student</h1>
        <Image src="/moreDark.png" alt="more" width={24} height={24} />
      </div>
      <div className="w-full h-[65%] relative">
        <ResponsiveContainer>
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="40%"
            outerRadius="100%"
            barSize={32}
            data={data}
          >
            <RadialBar background dataKey="count" />
          </RadialBarChart>
        </ResponsiveContainer>
        <Image
          src="/maleFemale.png"
          alt="maleFemale"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          width={70}
          height={70}
        />
      </div>

      <div className="flex justify-center gap-15 p-4">
        <div className="flex flex-col items-center">
          <div className="w-5 h-5 bg-[#C3EBFA] rounded-full"></div>
          <h1 className="font-bold">1,234</h1>
          <h2 className="text-xs text-gray-500 capitalize">Boys: (55%)</h2>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-5 h-5 bg-[#FAE27C] rounded-full"></div>
          <h1 className="font-bold">1,234</h1>
          <h2 className="text-xs text-gray-500 capitalize">Girls: (55%)</h2>
        </div>
      </div>
    </div>
  );
};

export default CountChart;
