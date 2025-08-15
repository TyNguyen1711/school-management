import { prisma } from "@/libs/prisma";
import { checkCurrentId, checkRole } from "@/libs/utils";
import React from "react";

const Announcements = async () => {
  const role = await checkRole();
  const currentId = await checkCurrentId();
  const roleCondition = {
    teachers: { lessons: { some: { teacherId: currentId! } } },
    students: { students: { some: { id: currentId! } } },
    parents: { students: { some: { parentId: currentId! } } },
  };
  const data = await prisma.announcement.findMany({
    take: 3,
    orderBy: { date: "desc" },
    where: {
      ...(role !== "admin" && {
        OR: [
          { classId: null },
          {
            class: roleCondition[role as keyof typeof roleCondition] || {},
          },
        ],
      }),
    },
  });
  return (
    <div className="flex flex-col gap-4 p-4 bg-white rounded-xl mt-8">
      <div className="flex items-center justify-between mb-1">
        <h1 className="text-xl font-semibold">Announcements</h1>
        <p className="text-gray-400 text-xs">ViewAll</p>
      </div>
      <div className="flex flex-col gap-4">
        {data[0] && (
          <div className="bg-[#EDF9FD] rounded-md p-4">
            <div className="flex justify-between items-center">
              <h2 className="font-semibold mb-1">{data[0].title}</h2>
              <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">
                {new Intl.DateTimeFormat("en-US").format(data[0].date)}
              </span>
            </div>
            <p className="text-sm text-gray-400">{data[0].description}</p>
          </div>
        )}

        {data[1] && (
          <div className="bg-[#F1F0FF] rounded-md p-4">
            <div className="flex justify-between items-center">
              <h2 className="font-semibold mb-1">{data[1].title}</h2>
              <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">
                {new Intl.DateTimeFormat("en-US").format(data[1].date)}
              </span>
            </div>
            <p className="text-sm text-gray-400">{data[1].description}</p>
          </div>
        )}

        {data[2] && (
          <div className="bg-[#FEFCE8] rounded-md p-4">
            <div className="flex justify-between items-center">
              <h2 className="font-semibold mb-1">{data[2].title}</h2>
              <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">
                {new Intl.DateTimeFormat("en-US").format(data[2].date)}
              </span>
            </div>
            <p className="text-sm text-gray-400">{data[2].description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Announcements;
