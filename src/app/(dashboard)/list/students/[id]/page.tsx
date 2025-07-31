import Announcements from "@/components/Announcements";
import BigCalendar from "@/components/BigCalendar";
import FormModal from "@/components/FormModal";
import Performance from "@/components/Performance";
import { role } from "@/libs/data";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const SingleStudentPage = () => {
  return (
    <div className="flex flex-1 p-4 flex-col gap-4 xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="bg-[#C3EBFA] flex-1 px-4 py-6 rounded-md flex gap-3">
            <div className="w-1/3">
              <Image
                src="https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt=""
                width={144}
                height={144}
                className="h-36 w-36 rounded-full object-center"
              />
            </div>
            <div className="w-2/3 flex flex-col gap-4 justify-between">
              <div className="flex items-center gap-3">
                <h1 className="text-xl font-semibold">Cameron Moran</h1>
                {role === "admin" && (
                  <FormModal
                    table="student"
                    type="update"
                    data={{
                      id: 1,
                      username: "deanguerrero",
                      email: "deanguerrero@gmail.com",
                      password: "password",
                      firstName: "Dean",
                      lastName: "Guerrero",
                      phone: "+1 234 567 89",
                      address: "1234 Main St, Anytown, USA",
                      bloodType: "A+",
                      dateOfBirth: "2000-01-01",
                      sex: "male",
                      img: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=1200",
                    }}
                  />
                )}
              </div>
              <p className="text-sm text-gray-500">
                Lorem ipsum, dolor sit amet consectetur adipsiling edeip
              </p>
              <div className="flex items-center justify-between gap-2 flex-wrap text-xs font-medium">
                <div className="w-full md:w-1/3 xl:w-full flex gap-2 items-center">
                  <Image src="/blood.png" alt="" width={14} height={14} />
                  <span>A +</span>
                </div>

                <div className="w-full md:w-1/3 xl:w-full flex gap-2 items-center">
                  <Image src="/date.png" alt="" width={14} height={14} />
                  <span>January 15</span>
                </div>

                <div className="w-full md:w-1/3 xl:w-full flex gap-2 items-center">
                  <Image src="/mail.png" alt="" width={14} height={14} />
                  <span>user@gmail.com</span>
                </div>

                <div className="w-full md:w-1/3 xl:w-full flex gap-2 items-center">
                  <Image src="/phone.png" alt="" width={14} height={14} />
                  <span>+1 234 567</span>
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
                <h1 className="text-xl font-semibold">6th</h1>
                <span className="text-sm text-gray-400">Grade</span>
              </div>
            </div>
            <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[47%] xl:w-[47%] 2xl:w-[48%] items-center">
              <Image src="/singleLesson.png" alt="" width={40} height={20} />
              <div>
                <h1 className="text-xl font-semibold">18</h1>
                <span className="text-sm text-gray-400">Lesson</span>
              </div>
            </div>
            <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[47%] xl:w-[47%] 2xl:w-[48%] items-center">
              <Image src="/singleClass.png" alt="" width={40} height={20} />
              <div>
                <h1 className="text-xl font-semibold">6A</h1>
                <span className="text-sm text-gray-400">Class</span>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white mt-4 rounded-md p-4 h-[850px]">
          <h1>Student's schedule</h1>
          <BigCalendar />
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-full xl:w-1/3">
        <div className="bg-white p-4">
          <h1 className="text-xl font-semibold">Shortcuts</h1>
          <div className="flex mt-4 flex-wrap text-xs text-gray-500 gap-4">
            <Link href="/" className="p-3 rounded-md bg-[#EDF9FD]">
              Student's Lessons
            </Link>
            <Link href="/" className="p-3 rounded-md bg-[#EDF9FD]">
              Student's Teachers
            </Link>
            <Link href="/" className="p-3 rounded-md bg-pink-50">
              Student's Exams
            </Link>
            <Link href="/" className="p-3 rounded-md bg-[#EDF9FD]">
              Student's Assignments
            </Link>
            <Link href="/" className="p-3 rounded-md bg-[#FEFCE8]">
              Student's Results
            </Link>
          </div>
        </div>

        <Performance />

        <Announcements />
      </div>
    </div>
  );
};

export default SingleStudentPage;
