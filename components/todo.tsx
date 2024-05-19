"use client";

import { cn } from "@/lib/utils";
import { Square, SquareCheckBig } from "lucide-react";

export const Todo = () => {
  return (
    <div className="w-full rounded-md border-2 border-gray-300  h-10 px-2 py-6 items-center flex justify-start">
      <div className="gap-x-2 flex items-center">
        <Square className="hover:cursor-pointer text-gray-400" />
        <p>Daily routine</p>
        <p className="bg-green-200 text-green-500 px-2 rounded-md">Today</p>
      </div>
    </div>
  );
};
