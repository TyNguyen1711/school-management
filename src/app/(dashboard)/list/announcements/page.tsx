import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";

import { prisma } from "@/libs/prisma";
import { ITEM_PER_PAGE } from "@/libs/setting";
import { checkCurrentId, checkRole } from "@/libs/utils";
import { auth } from "@clerk/nextjs/server";
import { Announcement, Class, Prisma } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
type AnnouncementList = Announcement & { class: Class };

const columns_temp = [
  {
    header: "Title",
    accessor: "title",
  },
  {
    header: "Class",
    accessor: "class",
  },
  {
    header: "Date",
    accessor: "date",
    className: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

const AnnouncementListPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const role = await checkRole();
  const currentUserId = await checkCurrentId();
  const columns = role === "admin" ? columns_temp : columns_temp.slice(0, -1);
  const { page, ...queryParams } = await searchParams;
  const p = page ? parseInt(page) : 1;
  const query: Prisma.AnnouncementWhereInput = {};
  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "search":
            query.title = {
              contains: value,
              mode: "insensitive",
            };
            break;
          default:
            break;
        }
      }
    }
  }
  const roleCondition = {
    teacher: { lessons: { some: { teacherId: currentUserId! } } },
    student: { students: { some: { id: currentUserId! } } },
    parent: { students: { some: { parentId: currentUserId! } } },
  };
  query.OR = [
    { classId: null },
    {
      class: roleCondition[role as keyof typeof roleCondition] || {},
    },
  ];

  const [announcements, count] = await prisma.$transaction([
    prisma.announcement.findMany({
      where: query,
      include: {
        class: true,
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.announcement.count({ where: query }),
  ]);
  const renderRow = (data: AnnouncementList) => {
    return (
      <tr
        key={data.id}
        className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-[#EDF9FD]"
      >
        <td className="flex items-center gap-4 p-4">{data.title}</td>
        <td>{data.class?.name || "-"}</td>
        <td className="hidden md:table-cell">
          {" "}
          {new Intl.DateTimeFormat("en-US").format(data.date)}
        </td>

        <td>
          <div className="flex items-center gap-2">
            {role === "admin" && (
              <>
                <FormModal table="announcement" type="update" />
                <FormModal table="announcement" type="delete" />
              </>
            )}
          </div>
        </td>
      </tr>
    );
  };
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
              <FormModal table="announcement" type="create" />
            )}
          </div>
        </div>
      </div>
      <div></div>
      <Table columns={columns} renderRow={renderRow} data={announcements} />
      <div>
        <Pagination page={p} count={count} />
      </div>
    </div>
  );
};

export default AnnouncementListPage;
