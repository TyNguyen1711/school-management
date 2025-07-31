import Announcements from "@/components/Announcements";
import BigCalendar from "@/components/BigCalendar";
import EventCalendar from "@/components/EventCalendar";
import React from "react";

const TeacherPage = () => {
  return (
    <div className="flex flex-col xl:flex-row gap-4 flex-1">
      <div className="w-full xl:w-2/3">
        <div className="h-full bg-white rounded p-4">
          <div className="capitialize text-xl font-semibold">Schedule</div>
          <BigCalendar />
        </div>
      </div>
      <div className="w-full xl:w-1/3">
        <EventCalendar />
        <Announcements />
      </div>
    </div>
  );
};

export default TeacherPage;
