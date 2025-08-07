import FormModel from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { prisma } from "@/libs/prisma";
import { ITEM_PER_PAGE } from "@/libs/setting";
import { checkRole } from "@/libs/utils";
import { auth } from "@clerk/nextjs/server";
import { Parent, Prisma, Student } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
type ParentList = Parent & { students: Student[] };
const columns = [
  {
    header: "Info",
    accessor: "info",
  },
  {
    header: "Student Names",
    accessor: "students",
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

const ParentListPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const role = await checkRole();
  const { page, ...queryParams } = await searchParams;
  const p = page ? parseInt(page) : 1;
  const query: Prisma.ParentWhereInput = {};
  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "search":
            query.name = { contains: value, mode: "insensitive" };
            break;
          default:
            break;
        }
      }
    }
  }
  const [parents, count] = await prisma.$transaction([
    prisma.parent.findMany({
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
      include: {
        students: true,
      },
      where: query,
    }),
    prisma.parent.count({ where: query }),
  ]);
  const renderRow = (data: ParentList) => {
    return (
      <tr
        key={data.id}
        className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-[#EDF9FD]"
      >
        <td className="flex gap-4 p-4">
          <div className="flex flex-col">
            <h3 className="font-semibold">{data.name}</h3>
            <p className="text-gray-500 text-xs">{data?.email}</p>
          </div>
        </td>
        <td className="hidden md:table-cell">
          {data.students.map((item) => item.name).join(", ")}
        </td>
        <td className="hidden lg:table-cell">{data.phone}</td>
        <td className="hidden lg:table-cell">{data.address}</td>
        <td>
          <div className="flex items-center gap-2">
            <FormModel table="parent" type="update" />
            {role === "admin" && <FormModel table="parent" type="delete" />}
          </div>
        </td>
      </tr>
    );
  };
  return (
    <div className="bg-white flex-1 p-4 mt-0 rounded-md">
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block font-semibold text-lg">All Parents</h1>
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
              <FormModel table="parent" type="create" />
            )}
          </div>
        </div>
      </div>
      <div></div>
      <Table columns={columns} renderRow={renderRow} data={parents} />
      <div>
        <Pagination page={p} count={count} />
      </div>
    </div>
  );
};

export default ParentListPage;
