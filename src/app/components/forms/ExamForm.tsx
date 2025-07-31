"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import InputField from "../InputField";
import Image from "next/image";

const schema = z.object({
  title: z.string().min(1, { message: "Title is required !" }),
  startDate: z.date({ message: "Start date is required!" }),
  endDate: z.date({ message: "End date is required!" }),
  subject: z.string().min(1, { message: "subject is required !" }),
  class: z.string().min(1, { message: "class is required !" }),
});
const ExamForm = ({
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
          label="Start Date"
          type="date"
          name="startDate"
          defaultValue={data?.startDate}
          register={register}
          error={errors.startDate}
        />
        <InputField
          label="End Date"
          type="date"
          name="endDate"
          defaultValue={data?.endDate}
          register={register}
          error={errors.endDate}
        />
      </div>

      <div className="flex justify-between gap-3 flex-col md:flex-row">
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Subject</label>
          <select
            {...register("subject")}
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            defaultValue={data?.subject}
          >
            <option value="chemical">Chemical</option>
            <option value="math">Math</option>
            <option value="english">English</option>
            <option value="biology">Biology</option>
            <option value="music">Music</option>
            <option value="art">Art</option>
          </select>
          {errors.subject?.message && (
            <p className="text-xs text-red-400">
              {errors.subject.message.toString()}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Class</label>
          <select
            {...register("class")}
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            defaultValue={data?.class}
          >
            <option value="1a">1A</option>
            <option value="2b">2B</option>
          </select>
          {errors.class?.message && (
            <p className="text-xs text-red-400">
              {errors.class.message.toString()}
            </p>
          )}
        </div>
      </div>

      <button className="bg-blue-500 p-2 text-white rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default ExamForm;
