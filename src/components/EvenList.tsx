import { prisma } from "@/libs/prisma";
import React from "react";

const EvenList = async ({ dateParam }: { dateParam: string | undefined }) => {
  const date = dateParam ? new Date(dateParam) : new Date();
  //   const date = new Date("2025-07-31T00:00:00");
  const data = await prisma.event.findMany({
    where: {
      startTime: {
        gte: new Date(date.setHours(0, 0, 0, 0)),
        lte: new Date(date.setHours(23, 59, 59, 999)),
      },
    },
  });
  return (
    <>
      {data.map((event) => (
        <div
          key={event.id}
          className="p-4 rounded-md border-2 border-gray-100 border-t-4 odd:border-t-[#C3EBFA] even:border-t-[#CFCEFF]"
        >
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-gray-600 font-semibold text-lg">
              {event.title}
            </h1>
            <p className="text-sm text-gray-300">
              {event.startTime.toLocaleDateString("en-UK", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })}
            </p>
          </div>

          <p className="text-sm text-gray-400 mt-2 mb-1">{event.description}</p>
        </div>
      ))}
    </>
  );
};

export default EvenList;
