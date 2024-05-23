"use client";
import { useState } from "react";
import { Chevron } from "@/components/ui/chevron";
import { createClient } from "@/utils/supabase/server";
import { Todo } from "@/components/todo";

// TODO: get the todos for each category

export default function TodoSection({ category }: { category: any }) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div className="flex flex-col w-full gap-y-2">
      <div className="flex gap-x-3 items-center">
        <Chevron open={open} handleClick={handleClick} />
        <p className="font-bold text-xl text-gray-700 ">{category.name}</p>
        <p className="text-gray-500 text-xl">{category.todos.length}</p>
      </div>
      <div className="pl-9 space-y-2">
        {!open &&
          category.todos &&
          category.todos.map((todo: any) => <Todo key={todo.id} todo={todo} />)}
      </div>
    </div>
  );
}
