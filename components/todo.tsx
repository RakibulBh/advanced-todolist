"use client";

import { cn } from "@/lib/utils";
import { Square, SquareCheckBig, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import CreateTodoDialog from "./create-todo";
import toast from "react-hot-toast";
import { deleteTodo } from "@/app/todos/actions";
import { Todo } from "@/types/custom";

export const TodoComponent = ({
  todo,
  categoryId,
}: {
  todo: Todo;
  categoryId: number;
}) => {
  const [done, setDone] = useState(todo.completed);
  const router = useRouter();

  const handleDelete = async () => {
    await deleteTodo(todo.id, categoryId);
    toast.success("Todo deleted successfully");
  };

  const handleEdit = async () => {
    console.log("To Edit!");
  };

  const handleTick = async () => {
    const res = await fetch("http://localhost:3000/api/todo", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: todo.id,
      }),
    });

    if (!res.ok) {
      toast.error(`Failed to update todo. Error code: ${res.status}`);
    }

    setDone(!done);
  };

  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const day = String(today.getDate()).padStart(2, "0");

  // define the dates
  const todayString = `${year}-${month}-${day}`;

  const isToday: boolean = todayString === todo.due;
  const isOverdue: boolean = todo.due < todayString;

  return (
    <div className="group w-full rounded-md border-2 border-gray-300  h-10 px-2 py-6 items-center flex justify-start">
      <div className="gap-x-2 flex w-full justify-between items-center">
        <div className="flex gap-x-2 items-center">
          <div onClick={handleTick} className="hover:cursor-pointer">
            {done ? (
              <SquareCheckBig className="text-green-500" />
            ) : (
              <Square className=" text-gray-400" />
            )}
          </div>
          <p>{todo.title}</p>
          <p
            className={cn(
              " px-2 rounded-md",
              !(isToday || isOverdue) && "bg-green-200 text-green-500",
              isToday && "bg-orange-200 text-orange-500",
              isOverdue && "bg-red-200 text-red-500"
            )}
          >
            {isToday && "Today"}
            {isOverdue && "Overdue"}
            {!(isToday || isOverdue) && todo.due}
          </p>
        </div>
        <div className="group-hover:flex hidden transition-opacity duration-75 gap-x-2">
          <div
            onClick={handleDelete}
            className="bg-red-200 p-1 rounded-md hover:cursor-pointer"
          >
            <Trash2 className="text-red-500" />
          </div>
        </div>
      </div>
    </div>
  );
};
