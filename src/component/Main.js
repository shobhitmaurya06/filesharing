"use client";
import { usePathname } from "next/navigation";
import Card from "./Card";

export default function Main({ children }) {
  const pathname = usePathname();

  return (
    <div className="w-full">
      <main className="w-full sm:max-w-7xl mx-auto flex justify-center items-center pt-5 pb-5 h-[73vh]">
        <div className="overflow-y-scroll h-full w-full overflow-x-hidden px-2">
          {pathname === "/" && <Card />}
          {children}
        </div>
      </main>
    </div>
  );
}
