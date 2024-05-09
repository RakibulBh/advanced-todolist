"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export const Category = ({ title }: any) => {
  const [open, setOpen] = useState(false);

  return (
    <Link href={`${title}`}>
      <div className="flex gap-x-2 items-center p-2">
        <button onClick={() => setOpen(!open)}>
          {open ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>
        <p className="font-semibold ">{title}</p>
      </div>
    </Link>
  );
};
