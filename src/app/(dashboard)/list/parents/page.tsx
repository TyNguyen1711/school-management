import FormModel from "@/app/components/FormModel";
import Pagination from "@/app/components/Pagination";
import Table from "@/app/components/Table";
import TableSearch from "@/app/components/TableSearch";
import { parentsData, role, studentsData, teachersData } from "@/app/libs/data";
import Image from "next/image";
import Link from "next/link";
import React from "react";
type Parent = {
  id: number;
  name: string;
  email?: string;
  students: string[];
  phone: string;
  address: string;
};

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
const ParentListPage = () => {
  const renderRow = (data: Parent) => {
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
        <td className="hidden md:table-cell">{data.students.join(", ")}</td>
        <td className="hidden lg:table-cell">{data.phone}</td>
        <td className="hidden lg:table-cell">{data.address}</td>
        <td>
          <div className="flex items-center gap-2">
            {/* <Link href={`/list/teachers/${data.id}`}>
              <button className="w-7 h-7 flex items-center justify-center rounded-full bg-[#C3EBFA]">
                <Image src="/view.png" alt="" width={16} height={16} />
              </button>
            </Link> */}
            <FormModel table="parent" type="update" />
            {role === "admin" && (
              // <button className="w-7 h-7 flex items-center justify-center rounded-full bg-[#CFCEFF]">
              //   <Image src="/delete.png" alt="" width={16} height={16} />
              // </button>
              <FormModel table="parent" type="delete" />
            )}
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
      <Table columns={columns} renderRow={renderRow} data={parentsData} />
      <div>
        <Pagination />
      </div>
    </div>
  );
};

export default ParentListPage;
