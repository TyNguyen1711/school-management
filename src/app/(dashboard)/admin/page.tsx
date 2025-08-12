import UserCard from "@/components/UserCard";
import React from "react";
import AttendanceChart from "@/components/AttendanceChart";
import FinanceChart from "@/components/FinanceChart";
import EventCalendar from "@/components/EventCalendar";
import Announcements from "@/components/Announcements";
import CountChartContainer from "@/components/CountChartContainer";
import AttendanceChartContrainer from "@/components/AttendanceChartContrainer";
import EvenCalendarContainer from "@/components/EventCalendarContainer";
const AdminPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="w-full lg:w-2/3 flex flex-col gap-8">
        <div className="flex gap-4 justify-between">
          <UserCard type="admins" />
          <UserCard type="teachers" />
          <UserCard type="students" />
          <UserCard type="parents" />
        </div>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full lg:w-1/3 h-[450px]">
            <CountChartContainer />
          </div>

          <div className="w-full lg:w-2/3  h-[450px]">
            <AttendanceChartContrainer />
          </div>
        </div>
        <div className="w-full h-[500px]">
          <FinanceChart />
        </div>
      </div>
      <div className="w-full lg:w-1/3 flex flex-col gap-6">
        <div className="">
          {/* <EventCalendar /> */}
          <EvenCalendarContainer searchParams={searchParams} />
          <Announcements />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
