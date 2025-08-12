"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const EventCalendar = () => {
  const [value, onChange] = useState<Value>(new Date());
  const router = useRouter();
  useEffect(() => {
    router.push(`?date=${value}`);
  }, [value, router]);

  return <Calendar onChange={onChange} value={value} locale="en-US" />;
};

export default EventCalendar;
