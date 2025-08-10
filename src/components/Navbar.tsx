import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import React from "react";

const Navbar = async () => {
  const user = await currentUser();

  return (
    <div className="flex justify-between items-center">
      <div className="hidden lg:flex items-center gap-3 px-3 py-2 bg-transparent border border-gray-300 rounded-[100px]">
        <Image src="/search.png" alt="Search" width={16} height={16} />
        <input type="text" placeholder="Search..." className="outline-none" />
      </div>
      <div className="flex items-center gap-5 justify-end w-full">
        <div className="bg-white p-2 rounded-full cursor-pointer">
          <Image src="/message.png" alt="Messages" width={20} height={20} />
        </div>
        <div className="bg-white p-2 rounded-full cursor-pointer relative">
          <Image
            src="/announcement.png"
            alt="Messages"
            width={20}
            height={20}
          />
          <div className="absolute -top-1 -right-1 bg-purple-500 text-white text-xs rounded-full px-1">
            3
          </div>
        </div>
        <div className="flex items-center gap-5">
          <div className="flex flex-col items-end">
            <div className="font-medium text-xs leading-3">John Does</div>
            <div className="text-gray-500 text-[10px]">
              {user?.publicMetadata?.role as string}
            </div>
          </div>
          {/* <Image
            src="/avatar.png"
            alt="avatar"
            width={32}
            height={32}
            className="rounded-full"
          /> */}
          <UserButton />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
