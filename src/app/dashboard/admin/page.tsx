import UserCard from "@/app/components/UserCard";
import React from "react";
import CountChart from "@/app/components/CountChart";
import AttendanceChart from "@/app/components/AttendanceChart";
import FinanceChart from "@/app/components/FinanceChart";
const AdminPage = () => {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="w-full lg:w-2/3 flex flex-col gap-8">
        <div className="flex gap-4 justify-between">
          <UserCard type="students" />
          <UserCard type="teachers" />
          <UserCard type="parents" />
          <UserCard type="staffs" />
        </div>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full lg:w-1/3 h-[450px]">
            <CountChart />
          </div>

          <div className="w-full lg:w-2/3  h-[450px]">
            <AttendanceChart />
          </div>
        </div>
        <div className="w-full h-[500px]">
          <FinanceChart />
        </div>
      </div>
      <div className="w-full lg:w-1/3">RIGHT</div>
    </div>
  );
};

export default AdminPage;
