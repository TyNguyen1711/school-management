import Announcements from "@/components/Announcements";
import BigCalendar from "@/components/BigCalendar";
import BigCalendarContainer from "@/components/BigCalendarContainer";
import EventCalendar from "@/components/EventCalendar";
import { prisma } from "@/libs/prisma";
import { checkCurrentId } from "@/libs/utils";
import React from "react";

const StudentPage = async () => {
  const currentId = await checkCurrentId();
  const classItem = await prisma.class.findMany({
    where: {
      students: { some: { id: currentId! } },
    },
  });
  return (
    <div className="flex flex-col xl:flex-row gap-4 flex-1">
      <div className="w-full xl:w-2/3">
        <div className="h-full bg-white rounded p-4">
          <div className="capitialize text-xl font-semibold">Schedule (4A)</div>
          <BigCalendarContainer type="classId" id={classItem[0].id!} />
        </div>
      </div>
      <div className="w-full xl:w-1/3">
        <EventCalendar />
        <Announcements />
      </div>
    </div>
  );
};

export default StudentPage;
