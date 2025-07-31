"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import InputField from "../InputField";
import Image from "next/image";

const schema = z.object({
  title: z.string().min(1, { message: "Title is required !" }),
  date: z.date({ message: "Date is required!" }),
  startTime: z.string({ message: "Start time is required!" }),
  endTime: z.string({ message: "End time is required!" }),
  class: z.string().min(1, { message: "class is required !" }),
});
const EventForm = ({
  type,
  data,
}: {
  type: "create" | "update";
  data?: any;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });
  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create a new exam" : "Update a exam"}
      </h1>

      <div className="flex justify-between gap-3 flex-col md:flex-row">
        {" "}
        <InputField
          label="Exam Title"
          name="title"
          defaultValue={data?.title}
          register={register}
          error={errors.title}
        />
        <InputField
          label="Date"
          type="date"
          name="date"
          defaultValue={data?.Date}
          register={register}
          error={errors.date}
        />
        <InputField
          label="Class"
          name="class"
          defaultValue={data?.class}
          register={register}
          error={errors.class}
        />
      </div>
      <div className="flex justify-between gap-3 flex-col md:flex-row">
        <InputField
          label="Start Time"
          type="time"
          name="startDate"
          defaultValue={data?.startTime}
          register={register}
          error={errors.startTime}
        />
        <InputField
          label="End Time"
          type="time"
          name="endTime"
          defaultValue={data?.endTime}
          register={register}
          error={errors.endTime}
        />
      </div>
      <button className="bg-blue-500 p-2 text-white rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default EventForm;
