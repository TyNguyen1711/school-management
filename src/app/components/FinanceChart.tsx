"use client";
import Image from "next/image";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
const data = [
  {
    name: "Jan",
    income: 4000,
    expense: 2400,
  },
  {
    name: "Feb",
    income: 3000,
    expense: 1398,
  },
  {
    name: "Mar",
    income: 2000,
    expense: 9800,
  },
  {
    name: "Apr",
    income: 2780,
    expense: 3908,
  },
  {
    name: "May",
    income: 1890,
    expense: 4800,
  },
  {
    name: "jun",
    income: 2390,
    expense: 3800,
  },
  {
    name: "Jul",
    income: 3490,
    expense: 4300,
  },
  {
    name: "Aug",
    income: 2000,
    expense: 2400,
  },
  {
    name: "Sep",
    income: 2780,
    expense: 3908,
  },
  {
    name: "Oct",
    income: 1890,
    expense: 4800,
  },
  {
    name: "Nov",
    income: 2390,
    expense: 3800,
  },
  {
    name: "Dec",
    income: 3490,
    expense: 4300,
  },
];
const FinanceChart = () => {
  return (
    <div className="w-full h-full bg-white rounded-xl">
      <div className="flex items-center justify-between p-4">
        <h1 className="text-lg font-semibold">Finance</h1>
        <Image src="/moreDark.png" alt="more" width={24} height={24} />
      </div>
      <div className="w-full h-[85%]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 0,
              right: 30,
              left: 20,
              bottom: 10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              axisLine={false}
              tick={{ fill: "#d1d5db" }}
              tickLine={false}
              tickMargin={10}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#d1d5db" }}
              tickMargin={20}
            />
            <Tooltip />
            <Legend
              align="center"
              verticalAlign="top"
              wrapperStyle={{ paddingBottom: "20px" }}
            />
            <Line
              type="monotone"
              dataKey="income"
              stroke="#C3EBFA"
              activeDot={{ r: 8 }}
              strokeWidth={5}
            />
            <Line
              type="monotone"
              dataKey="expense"
              stroke="#CFCEFF"
              strokeWidth={5}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FinanceChart;
