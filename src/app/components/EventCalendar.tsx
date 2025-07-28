"use client";
import Image from "next/image";
import React from "react";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
const events = [
  {
    id: 1,
    title: "Lorem ipsum dolor",
    time: "12:00 PM - 2:00 PM",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 2,
    title: "Lorem ipsum dolor",
    time: "12:00 PM - 2:00 PM",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 3,
    title: "Lorem ipsum dolor",
    time: "12:00 PM - 2:00 PM",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
];
type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const EventCalendar = () => {
  const [value, onChange] = useState<Value>(new Date());

  return (
    <div className="bg-white rounded-md p-4">
      <Calendar onChange={onChange} value={value} locale="en-US" />
      <div className="flex items-center justify-between mt-2">
        <h1 className="text-xl font-semibold">Events</h1>
        <Image src="/moreDark.png" alt="more" width={24} height={24} />
      </div>
      <div className="flex flex-col gap-4 mt-4">
        {events.map((event) => (
          <div
            key={event.id}
            className="p-4 rounded-md border-2 border-gray-100 border-t-4 odd:border-t-[#C3EBFA] even:border-t-[#CFCEFF]"
          >
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-gray-600 font-semibold text-lg">
                {event.title}
              </h1>
              <p className="text-sm text-gray-300">{event.time}</p>
            </div>

            <p className="text-sm text-gray-400 mt-2 mb-1">
              {event.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventCalendar;
