import Announcements from "@/components/Announcements";
import BigCalendar from "@/components/BigCalendar";
import BigCalendarContainer from "@/components/BigCalendarContainer";
import FormContainer from "@/components/FormContainer";
import FormModal from "@/components/FormModal";
import Performance from "@/components/Performance";
import { prisma } from "@/libs/prisma";
import { checkRole } from "@/libs/utils";
import { Teacher } from "@prisma/client";
import { init } from "next/dist/compiled/webpack/webpack";

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

const SingleTeacherPage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const teacher:
    | (Teacher & {
        _count: { subjects: number; lessons: number; classes: number };
      })
    | null = await prisma.teacher.findUnique({
    where: { id },
    include: {
      _count: {
        select: {
          subjects: true,
          lessons: true,
          classes: true,
        },
      },
    },
  });
  if (!teacher) {
    return notFound();
  }
  const role = await checkRole();
  return (
    <div className="flex flex-1 p-4 flex-col gap-4 xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="bg-[#C3EBFA] flex-1 px-4 py-6 rounded-md flex gap-3">
            <div className="w-1/3">
              <Image
                src={teacher?.img || "/noAvatar.png"}
                alt=""
                width={144}
                height={144}
                className="h-36 w-36 rounded-full object-center"
              />
            </div>
            <div className="w-2/3 flex flex-col gap-4 justify-between">
              <div className="flex items-center gap-3">
                <h1 className="text-xl font-semibold">
                  {teacher.name + " " + teacher.surname}
                </h1>
                {role === "admin" && (
                  <FormContainer table="teacher" type="update" data={teacher} />
                )}
              </div>

              <p className="text-sm text-gray-500">
                Lorem ipsum, dolor sit amet consectetur adipsiling edeip
              </p>
              <div className="flex items-center justify-between gap-2 flex-wrap text-xs font-medium">
                <div className="w-full md:w-1/3 xl:w-full flex gap-2 items-center">
                  <Image src="/blood.png" alt="" width={14} height={14} />
                  <span>{teacher.bloodType}</span>
                </div>

                <div className="w-full md:w-1/3 xl:w-full flex gap-2 items-center">
                  <Image src="/date.png" alt="" width={14} height={14} />
                  <span>
                    {new Intl.DateTimeFormat("en-GB").format(teacher.birthday)}
                  </span>
                </div>

                <div className="w-full md:w-1/3 xl:w-full flex gap-2 items-center">
                  <Image src="/mail.png" alt="" width={14} height={14} />
                  <span>{teacher.email || "-"}</span>
                </div>

                <div className="w-full md:w-1/3 xl:w-full flex gap-2 items-center">
                  <Image src="/phone.png" alt="" width={14} height={14} />
                  <span>{teacher.phone || "-"}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 flex flex-wrap gap-4">
            <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[47%] xl:w-[47%] 2xl:w-[48%] items-center">
              <Image
                src="/singleAttendance.png"
                alt=""
                width={40}
                height={20}
              />
              <div>
                <h1 className="text-xl font-semibold">90%</h1>
                <span className="text-sm text-gray-400">Attendance</span>
              </div>
            </div>
            <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[47%] xl:w-[47%] 2xl:w-[48%] items-center">
              <Image src="/singleBranch.png" alt="" width={40} height={20} />
              <div>
                <h1 className="text-xl font-semibold">
                  {teacher._count.subjects}
                </h1>
                <span className="text-sm text-gray-400">Branch</span>
              </div>
            </div>
            <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[47%] xl:w-[47%] 2xl:w-[48%] items-center">
              <Image src="/singleLesson.png" alt="" width={40} height={20} />
              <div>
                <h1 className="text-xl font-semibold">
                  {teacher._count.lessons}
                </h1>
                <span className="text-sm text-gray-400">Lesson</span>
              </div>
            </div>
            <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[47%] xl:w-[47%] 2xl:w-[48%] items-center">
              <Image src="/singleClass.png" alt="" width={40} height={20} />
              <div>
                <h1 className="text-xl font-semibold">
                  {teacher._count.classes}
                </h1>
                <span className="text-sm text-gray-400">Class</span>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white mt-4 rounded-md p-4 h-[850px]">
          <h1>Teacher's schedule</h1>
          <BigCalendarContainer type="teacherId" id={id} />
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-full xl:w-1/3">
        <div className="bg-white p-4">
          <h1 className="text-xl font-semibold">Shortcuts</h1>
          <div className="flex mt-4 flex-wrap text-xs text-gray-500 gap-4">
            <Link
              href={`/list/classes?supervisorId=${"teacher1"}`}
              className="p-3 rounded-md bg-[#EDF9FD]"
            >
              Teacher's Classes
            </Link>
            <Link
              href={`/list/students?teacherId=${"teacher1"}`}
              className="p-3 rounded-md bg-[#EDF9FD]"
            >
              Teacher's Students
            </Link>
            <Link
              href={`/list/lessons?teacherId=${"teacher1"}`}
              className="p-3 rounded-md bg-[#FEFCE8]"
            >
              Teacher's Lesson
            </Link>
            <Link
              href={`/list/exams?teacherId=${"teacher1"}`}
              className="p-3 rounded-md bg-pink-50"
            >
              Teacher's Exams
            </Link>
            <Link
              href={`/list/assignments?teacherId=${"teacher1"}`}
              className="p-3 rounded-md bg-[#EDF9FD]"
            >
              Teacher's Assignments
            </Link>
          </div>
        </div>

        <Performance />

        <Announcements />
      </div>
    </div>
  );
};

export default SingleTeacherPage;
