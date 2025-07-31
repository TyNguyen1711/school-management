import Image from "next/image";
import Link from "next/link";
import Menu from "../../components/Menu";
import Navbar from "../../components/Navbar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen">
      {/* LEFT */}
      <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] p-3">
        <Link
          href="/Dashboard/teacher"
          className="flex items-center justify-center lg:justify-start gap-3"
        >
          <Image src="/logo.png" alt="Logo" width={32} height={32} />
          <span className="hidden lg:block font-bold text-[18px] py-3">
            SchooLama
          </span>
        </Link>

        <Menu />
      </div>
      {/* RIGHT */}
      <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] p-4 bg-[#F7F8FA] overflow-auto flex flex-col">
        <Navbar />
        <div className="mt-8">{children}</div>
      </div>
    </div>
  );
}
