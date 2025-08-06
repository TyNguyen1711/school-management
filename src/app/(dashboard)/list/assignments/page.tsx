import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import {
  assignmentsData,
  examsData,
  parentsData,
  role,
  studentsData,
  subjectsData,
  teachersData,
} from "@/libs/data";
import { prisma } from "@/libs/prisma";
import { ITEM_PER_PAGE } from "@/libs/setting";
import { Assignment, Class, Prisma, Subject, Teacher } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
// type Assignment = {
//   id: number;
//   subject: string;
//   class: string;
//   teacher: string;
//   dueDate: string;
// };
type AssignmentList = Assignment & {
  lesson: {
    subject: Subject;
    class: Class;
    teacher: Teacher;
  };
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
    header: "Due Date",
    accessor: "dueDate",
    className: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

const renderRow = (data: AssignmentList) => {
  return (
    <tr
      key={data.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-[#EDF9FD]"
    >
      <td className="flex gap-4 p-4">
        <h3 className="font-semibold">{data.lesson.subject.name}</h3>
      </td>
      <td>{data.lesson.class.name}</td>
      <td className="hidden md:table-cell">{data.lesson.teacher.name}</td>

      <td className="hidden md:table-cell">
        {new Intl.DateTimeFormat("en-US").format(data.dueDate)}
      </td>

      <td>
        <div className="flex items-center gap-2">
          {/* <Link href={`/list/teachers/${data.id}`}>
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-[#C3EBFA]">
              <Image src="/view.png" alt="" width={16} height={16} />
            </button>
          </Link> */}
          <FormModal table="assignment" type="update" />

          {role === "admin" && (
            //   <button className="w-7 h-7 flex items-center justify-center rounded-full bg-[#CFCEFF]">
            //     <Image src="/delete.png" alt="" width={16} height={16} />
            //   </button>
            <FormModal table="assignment" type="delete" />
          )}
        </div>
      </td>
    </tr>
  );
};
const AssignmentListPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const { page, ...queryParams } = await searchParams;
  const p = page ? parseInt(page) : 1;
  const query: Prisma.AssignmentWhereInput = {};
  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "classId":
            query.lesson = { classId: parseInt(value) };
            break;
          case "teacherId":
            query.lesson = { teacherId: value };
            break;
          case "search":
            query.lesson = {
              subject: {
                name: { contains: value, mode: "insensitive" },
              },
            };
        }
      }
    }
  }
  const [assignments, count] = await prisma.$transaction([
    prisma.assignment.findMany({
      where: query,
      include: {
        lesson: {
          select: {
            subject: { select: { name: true } },
            class: { select: { name: true } },
            teacher: { select: { name: true, surname: true } },
          },
        },
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.assignment.count({ where: query }),
  ]);
  return (
    <div className="bg-white flex-1 p-4 mt-0 rounded-md">
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block font-semibold text-lg">
          All Assignments
        </h1>
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
              //   <button className="h-8 w-8 flex items-center justify-center rounded-full bg-[#FAE27C]">
              //     <Image src="/plus.png" alt="filter" width={15} height={15} />
              //   </button>
              <FormModal table="assignment" type="create" />
            )}
          </div>
        </div>
      </div>
      <div></div>
      <Table columns={columns} renderRow={renderRow} data={assignments} />
      <div>
        <Pagination page={p} count={count} />
      </div>
    </div>
  );
};

export default AssignmentListPage;
