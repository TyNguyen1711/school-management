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

const style = {
  top: "50%",
  right: 0,
  transform: "translate(0, -50%)",
  lineHeight: "24px",
};
const CountChart = ({ boys, girls }: { boys: number; girls: number }) => {
  const data = [
    { name: "Totals", count: boys + girls, fill: "white" },
    {
      name: "Girls",
      count: boys,
      fill: "#FAE27C",
    },
    {
      name: "Boys",
      count: girls,
      fill: "#C3EBFA",
    },
  ];
  return (
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
  );
};

export default CountChart;
