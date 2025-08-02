"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const TableSearch = () => {
  const router = useRouter();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = (e.currentTarget[0] as HTMLInputElement).value;
    const params = new URLSearchParams(window.location.search);
    params.set("search", value);
    router.push(`${window.location.pathname}?${params}`);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full md:w-auto flex items-center gap-3 px-3 py-2 bg-transparent border border-gray-300 rounded-[100px]"
    >
      <Image src="/search.png" alt="Search" width={16} height={16} />
      <input type="text" placeholder="Search..." className="outline-none" />
    </form>
  );
};

export default TableSearch;
