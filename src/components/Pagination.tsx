"use client";
import { ITEM_PER_PAGE } from "@/libs/setting";
import { useRouter } from "next/navigation";
import React, { useReducer } from "react";

const Pagination = ({ page, count }: { page: number; count: number }) => {
  const numPage = Math.ceil(count / ITEM_PER_PAGE);
  const router = useRouter();
  const changePage = (newPage: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set("page", newPage.toString());
    router.push(`${window.location.pathname}?${params}`);
  };
  return (
    <div className="flex items-center justify-between p-4 text-gray-500">
      <button
        disabled={!!(page === 1 && numPage > 1)}
        onClick={() => changePage(page - 1)}
        className="py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Prev
      </button>
      <div className="flex items-center gap-2 text-sm">
        {Array.from({ length: Math.ceil(count / ITEM_PER_PAGE) }, (_, i) => {
          return (
            <button
              key={i + 1}
              className={`px-2 rounded-sm ${
                i + 1 == page ? "bg-[#C3EBFA]" : ""
              }`}
              onClick={() => changePage(i + 1)}
            >
              {i + 1}
            </button>
          );
        })}
      </div>
      <button
        disabled={!!(page === numPage)}
        className="py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => changePage(page + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
