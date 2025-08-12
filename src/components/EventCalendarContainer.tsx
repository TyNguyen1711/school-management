import Image from "next/image";
import React from "react";
import EvenList from "./EvenList";
import EventCalendar from "./EventCalendar";

const EventCalendarContainer = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const { date } = await searchParams;
  // console.log("EventCalendarContainer date:", date);
  return (
    <div className="bg-white rounded-md p-4">
      {/* <Calendar onChange={onChange} value={value} locale="en-US" /> */}
      <EventCalendar />
      <div className="flex items-center justify-between mt-2">
        <h1 className="text-xl font-semibold">Events</h1>
        <Image src="/moreDark.png" alt="more" width={24} height={24} />
      </div>
      <div className="flex flex-col gap-4 mt-4">
        <EvenList dateParam={date} />
      </div>
    </div>
  );
};

export default EventCalendarContainer;
