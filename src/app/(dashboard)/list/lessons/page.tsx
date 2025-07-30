import FormModel from "@/app/components/FormModal";
import Pagination from "@/app/components/Pagination";
import Table from "@/app/components/Table";
import TableSearch from "@/app/components/TableSearch";
import {
  classesData,
  lessonsData,
  parentsData,
  role,
  studentsData,
  subjectsData,
  teachersData,
} from "@/app/libs/data";
import Image from "next/image";
import Link from "next/link";
import React from "react";
type Lesson = {
  id: number;
  subject: string;
  class: string;
  teacher: string;
};

const columns = [
  {
    header: "Subject Name",
    accessor: "name",
  },
  {
    header: "Class",
    accessor: "class",
  },
  {
    header: "Teacher",
    accessor: "teacher",
    className: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];
const LessonListPage = () => {
  const renderRow = (data: Lesson) => {
    return (
      <tr
        key={data.id}
        className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-[#EDF9FD]"
      >
        <td className="flex gap-4 p-4">
          <h3 className="font-semibold">{data.subject}</h3>
        </td>
        <td>{data.class}</td>
        <td className="hidden md:table-cell">{data.teacher}</td>
        <td>
          <div className="flex items-center gap-2">
            {/* <Link href={`/list/teachers/${data.id}`}>
              <button className="w-7 h-7 flex items-center justify-center rounded-full bg-[#C3EBFA]">
                <Image src="/view.png" alt="" width={16} height={16} />
              </button>
            </Link> */}
            <FormModel table="lesson" type="update" />
            {role === "admin" && (
              // <button className="w-7 h-7 flex items-center justify-center rounded-full bg-[#CFCEFF]">
              //   <Image src="/delete.png" alt="" width={16} height={16} />
              // </button>
              <FormModel table="lesson" type="delete" />
            )}
          </div>
        </td>
      </tr>
    );
  };
  return (
    <div className="bg-white flex-1 p-4 mt-0 rounded-md">
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block font-semibold text-lg">All Lessons</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end  md:mb-2">
            <button className="h-8 w-8 flex items-center justify-center rounded-full bg-[#FAE27C]">
              <Image src="/filter.png" alt="filter" width={15} height={15} />
            </button>

            <button className="h-8 w-8 flex items-center justify-center rounded-full bg-[#FAE27C]">
              <Image src="/sort.png" alt="filter" width={15} height={15} />
            </button>

            {role === "admin" && (
              // <button className="h-8 w-8 flex items-center justify-center rounded-full bg-[#FAE27C]">
              //   <Image src="/plus.png" alt="filter" width={15} height={15} />
              // </button>
              <FormModel table="lesson" type="create" />
            )}
          </div>
        </div>
      </div>
      <div></div>
      <Table columns={columns} renderRow={renderRow} data={lessonsData} />
      <div>
        <Pagination />
      </div>
    </div>
  );
};

export default LessonListPage;
