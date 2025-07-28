import Announcements from "@/app/components/Announcements";
import BigCalendar from "@/app/components/BigCalendar";
import EventCalendar from "@/app/components/EventCalendar";
import React from "react";

const ParentPage = () => {
  return (
    <div className="flex flex-col xl:flex-row gap-4 flex-1">
      <div className="w-full xl:w-2/3">
        <div className="h-full bg-white rounded p-4">
          <div className="capitialize text-xl font-semibold">
            Schedule (John)
          </div>
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

export default ParentPage;
