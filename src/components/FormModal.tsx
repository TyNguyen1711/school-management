"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import TeacherForm from "./forms/TeacherForm";
import StudentForm from "./forms/StudentForm";
import ParentForm from "./forms/ParentForm";
import ExamForm from "./forms/ExamForm";
import EventForm from "./forms/EventForm";
import SubjectForm from "./forms/SubjectForm";
import { deleteSubject } from "@/libs/action";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { FormContainerProps } from "./FormContainer";

const forms: {
  [key: string]: (
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    type: "create" | "update",
    data?: any
  ) => React.ReactElement;
} = {
  teacher: (setOpen, type, data) => <TeacherForm type={type} data={data} />,
  student: (setOpen, type, data) => <StudentForm type={type} data={data} />,
  parent: (setOpen, type, data) => <ParentForm type={type} data={data} />,
  exam: (setOpen, type, data) => <ExamForm type={type} data={data} />,
  subject: (setOpen, type, data) => (
    <SubjectForm setOpen={setOpen} type={type} data={data} />
  ),
  event: (setOpen, type, data) => <EventForm type={type} data={data} />,
};
const deleteActionMap = {
  subject: deleteSubject,
  //   class: deleteClass,
  //   teacher: deleteTeacher,
  //   student: deleteStudent,
  //   exam: deleteExam,
  // // TODO: OTHER DELETE ACTIONS
  //   parent: deleteSubject,
  //   lesson: deleteSubject,
  //   assignment: deleteSubject,
  //   result: deleteSubject,
  //   attendance: deleteSubject,
  //   event: deleteSubject,
  //   announcement: deleteSubject,
};
const FormModel = ({ table, type, data, id }: FormContainerProps) => {
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
    const [state, formAction, isPending] = React.useActionState(deleteSubject, {
      success: false,
      error: false,
    });
    const router = useRouter();

    useEffect(() => {
      if (state.success) {
        toast(`Subject has been deleted`);
        router.refresh();
      }
    }, [state]);

    return type === "delete" && id ? (
      <form action={formAction} className="flex flex-col gap-4 p-4">
        <input type="hidden" name="id" value={data.id} />
        <div className="text-center text-lg font-semibold">
          All data will be lost. Are you sure you want to delete this {table}?
        </div>
        <button
          className={`text-white py-2 px-4 rounded-md border-none w-max self-center flex items-center justify-center gap-2 ${
            isPending
              ? "bg-red-400 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700"
          }`}
          disabled={isPending}
        >
          {isPending ? (
            <>
              <svg
                className="animate-spin h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Deleting...
            </>
          ) : (
            "Delete"
          )}
        </button>
      </form>
    ) : type === "create" || type === "update" ? (
      forms[table](setOpen, type, data)
    ) : (
      "Not found"
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
