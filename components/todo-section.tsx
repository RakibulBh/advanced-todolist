"use client";
import { useState } from "react";
import { Chevron } from "@/components/ui/chevron";
import { TodoComponent } from "@/components/todo";
import { Category } from "@/types/custom";
import { Todo } from "@/types/custom";
import CreateTodoDialog from "./create-todo";

// TODO: get the todos for each category

export default function TodoSection({ category }: { category: Category }) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div className=" flex flex-col w-full gap-y-2 ">
      <div className="group flex gap-x-3 items-center justify-between border-b-2 border-gray-300 pb-4">
        <div className="flex gap-x-3 items-center">
          <Chevron open={open} handleClick={handleClick} />
          <p className="font-bold text-xl text-gray-700 ">{category.name}</p>
          <p className="text-gray-500 text-xl">{category.todos.length}</p>
        </div>
        <div className="hidden group-hover:block">
          <CreateTodoDialog mode="add" />
        </div>
      </div>
      <div className="pl-9 space-y-2">
        {!open &&
          category.todos &&
          category.todos.map((todo: Todo) => (
            <TodoComponent key={todo.id} categoryId={category.id} todo={todo} />
          ))}
      </div>
    </div>
  );
}
