"use client";

import { cn, formatDate } from "@/lib/utils";
import { Square, SquareCheckBig, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import CreateTodoDialog from "./create-todo";
import toast from "react-hot-toast";
import { deleteTodo, updateTodo } from "@/app/todos/actions";
import { Todo } from "@/types/custom";
import { Checkbox } from "./ui/checkbox";
import { set } from "zod";

export const TodoComponent = ({
  todo,
  categoryId,
}: {
  todo: Todo;
  categoryId: number;
}) => {
  const [done, setDone] = useState(todo.completed);

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

  const isToday: boolean = todayString === formatDate(todo.due);
  const isOverdue: boolean = formatDate(todo.due) < todayString;

  const [checked, setChecked] = useState(todo.completed || false);

  const handleCheck = async (value: boolean) => {
    setChecked(value);
    await updateTodo({ ...todo, completed: value });
  };

  return (
    <div className="group w-full   h-10 px-2 py-6 items-center flex justify-start">
      <div className="gap-x-2 flex w-full justify-between items-center">
        <div className="flex gap-x-2 items-center">
          <Checkbox
            className="border-gray-400"
            checked={checked}
            onCheckedChange={(value: boolean) => handleCheck(value)}
          />
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
            {!(isToday || isOverdue) && formatDate(todo.due)}
          </p>
        </div>
        <div className="group-hover:flex hidden transition-opacity duration-75 gap-x-2">
          <CreateTodoDialog mode="edit" todo={todo} />
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
