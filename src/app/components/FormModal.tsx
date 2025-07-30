"use client";
import Image from "next/image";
import React, { useState } from "react";
import TeacherForm from "./forms/TeacherForm";

const FormModel = ({
  table,
  type,
  data,
  id,
}: {
  table:
    | "teacher"
    | "student"
    | "parent"
    | "subject"
    | "class"
    | "lesson"
    | "exam"
    | "assignment"
    | "result"
    | "attendance"
    | "event"
    | "announcement";
  type: "create" | "update" | "delete";
  data?: any;
  id?: number;
}) => {
  const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
  id = 1;
  const bgColor =
    type === "create"
      ? "bg-[#FAE27C]"
      : type === "update"
      ? "bg-[#C3EBFA]"
      : "bg-[#CFCEFF]";
  const [open, setOpen] = useState(false);
  const Form = () => {
    return type === "delete" && id ? (
      <div className="flex flex-col gap-4 p-4">
        <div className="text-center text-lg font-semibold">
          All data will be lost. Are you sure you want to delete this {table}?
        </div>
        <button className="bg-red-600 text-white py-2 px-4 rounded-md border-none w-max self-center">
          Delete
        </button>
      </div>
    ) : (
      <TeacherForm type="update" data={data} />
    );
  };
  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className={`${size} ${bgColor} flex items-center justify-center rounded-full`}
      >
        <Image src={`/${type}.png`} alt="" width={16} height={16} />
      </button>
      {open && (
        <div className="absolute w-screen h-screen top-0 left-0 bg-[rgba(0,0,0,0.6)] z-100 flex items-center justify-center">
          <div className="p-4 bg-white relative rounded-md w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]">
            <div className="absolute top-4 right-4 cursor-pointer">
              <Image
                onClick={() => setOpen(!open)}
                src="/close.png"
                alt=""
                width={15}
                height={15}
              />
            </div>
            <Form />
          </div>
        </div>
      )}
    </>
  );
};

export default FormModel;
