"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";

import { usePathname } from "next/navigation";

export default function Navlink({
  name,
  link,
  icon,
}: {
  name: string;
  link: string;
  icon: any;
}) {
  const pathname = usePathname();
  return (
    <Link href={link}>
      <div
        className={cn(
          "w-full px-4 py-3  flex gap-x-3 items-center rounded-xl",
          pathname === link && "bg-gray-300"
        )}
      >
        {icon}
        <p className="text-md">{name}</p>
      </div>
    </Link>
  );
}
