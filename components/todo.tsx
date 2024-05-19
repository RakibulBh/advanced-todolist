"use client";

import { cn } from "@/lib/utils";
import { Square, SquareCheckBig } from "lucide-react";

interface Todo {
  id: string;
  title: string;
  due: string;
  done: boolean;
}

export const Todo = ({ todo }: { todo: Todo }) => {
  return (
    <div className="w-full rounded-md border-2 border-gray-300  h-10 px-2 py-6 items-center flex justify-start">
      <div className="gap-x-2 flex items-center">
        <Square className="hover:cursor-pointer text-gray-400" />
        <p>{todo.title}</p>
        <p className="bg-green-200 text-green-500 px-2 rounded-md">
          {todo.due}
        </p>
      </div>
    </div>
  );
};
