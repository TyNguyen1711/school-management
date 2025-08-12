import React from "react";
import CountChart from "./CountChart";
import AttendanceChart from "./AttendanceChart";
import Image from "next/image";
import { prisma } from "@/libs/prisma";

const AttendanceChartContrainer = async () => {
  // const today = new Date();
  const today = new Date("2025-07-31T00:00:00");

  const dayofWeek = today.getDay();
  const daysSinceMonday = dayofWeek === 0 ? 6 : dayofWeek - 1; // Adjust for Sunday
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - daysSinceMonday);
  const resData = await prisma.attendance.findMany({
    where: {
      date: {
        gte: startOfWeek,
      },
    },
    select: {
      date: true,
      present: true,
    },
  });

  const nameDaysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const attendanceMap: { [key: string]: { present: number; absent: number } } =
    {
      Mon: { present: 0, absent: 0 },
      Tue: { present: 0, absent: 0 },
      Wed: { present: 0, absent: 0 },
      Thu: { present: 0, absent: 0 },
      Fri: { present: 0, absent: 0 },
    };
  resData.forEach((item) => {
    const itemDate = new Date(item.date);
    const itemDayOfWeek = itemDate.getDay();

    if (itemDayOfWeek >= 1 && itemDayOfWeek <= 5) {
      const dayName = nameDaysOfWeek[itemDayOfWeek - 1];
      if (item.present) {
        attendanceMap[dayName].present += 1;
      } else {
        attendanceMap[dayName].absent += 1;
      }
    }
  });
  // const data = Object.entries(attendanceMap).map(([dayName, counts]) => ({
  //   name: dayName,
  //   present: counts.present,
  //   absent: counts.absent,
  // }));
  const data = nameDaysOfWeek.map((item) => ({
    name: item,
    present: attendanceMap[item]?.present || 0,
    absent: attendanceMap[item]?.absent || 0,
  }));
  console.log(data);
  return (
    <div className="w-full h-full bg-white rounded-xl">
      <div className="flex items-center justify-between p-4">
        <h1 className="text-lg font-semibold">Attendance</h1>
        <Image src="/moreDark.png" alt="more" width={24} height={24} />
      </div>
      <AttendanceChart data={data} />
    </div>
  );
};

export default AttendanceChartContrainer;
