import FormModel from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { prisma } from "@/libs/prisma";
import { ITEM_PER_PAGE } from "@/libs/setting";
import { Attendance, Class, Result, Student } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Prisma } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";
import { checkRole } from "@/libs/utils";

type StudentList = Student & { class: Class };
const columns = [
  {
    header: "Info",
    accessor: "info",
  },
  {
    header: "Student ID",
    accessor: "studentId",
    className: "hidden md:table-cell",
  },
  {
    header: "Grade",
    accessor: "grade",
    className: "hidden md:table-cell",
  },
  {
    header: "Phone",
    accessor: "phone",
    className: "hidden lg:table-cell",
  },
  {
    header: "Address",
    accessor: "address",
    className: "hidden lg:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

const StudentListPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const role = await checkRole();
  const { page, ...queryParams } = await searchParams;
  const p = page ? parseInt(page) : 1;
  const query: Prisma.StudentWhereInput = {};
  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "teacherId":
            query.class = {
              lessons: {
                some: { teacherId: value },
              },
            };
            break;
          case "search":
            query.name = {
              contains: value,
              mode: "insensitive",
            };
        }
      }
    }
  }
  const [students, count] = await prisma.$transaction([
    prisma.student.findMany({
      where: query,
      include: {
        class: true,
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.student.count({ where: query }),
  ]);
  const renderRow = (data: StudentList) => {
    return (
      <tr
        key={data.id}
        className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-[#EDF9FD]"
      >
        <td className="flex gap-4 p-4">
          <Image
            src={data.img ? data.img : "/profile.png"}
            alt="image"
            width={40}
            height={40}
            className="rounded-full hidden lg:block"
          />
          <div className="flex flex-col">
            <h3 className="font-semibold">{data.name}</h3>
            <p className="text-gray-500 text-xs">{data.class.name}</p>
          </div>
        </td>
        <td className="hidden md:table-cell">{data.id}</td>
        <td className="hidden md:table-cell">{data.class.name[0]}</td>

        <td className="hidden lg:table-cell">{data.phone}</td>
        <td className="hidden lg:table-cell">{data.address}</td>
        <td>
          <div className="flex items-center gap-2">
            <Link href={`/list/students/${data.id}`}>
              <button className="w-7 h-7 flex items-center justify-center rounded-full bg-[#C3EBFA]">
                <Image src="/view.png" alt="" width={16} height={16} />
              </button>
            </Link>
            {role === "admin" && <FormModel table="student" type="delete" />}
          </div>
        </td>
      </tr>
    );
  };
  return (
    <div className="bg-white flex-1 p-4 mt-0 rounded-md">
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block font-semibold text-lg">All Students</h1>
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
              <FormModel table="student" type="create" />
            )}
          </div>
        </div>
      </div>
      <div></div>
      <Table columns={columns} renderRow={renderRow} data={students} />
      <div>
        <Pagination page={p} count={count} />
      </div>
    </div>
  );
};

export default StudentListPage;
