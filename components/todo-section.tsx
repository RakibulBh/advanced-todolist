"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { Todo } from "./todo";
import { useState } from "react";

interface Todo {
  id: string;
  title: string;
  due: string;
  done: boolean;
}
type Category = {
  id: string;
  name: string;
  todos: Todo[];
};

export default function TodoSection({ category }: { category: Category }) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div className="flex flex-col w-full gap-y-2">
      <div className="flex gap-x-3 items-center">
        <div className="hover:cursor-pointer" onClick={handleClick}>
          {open ? <ChevronUp /> : <ChevronDown />}
        </div>
        <p className="font-bold text-xl text-gray-700 ">{category.name}</p>
        <p className="text-gray-500 text-xl">{category.todos.length}</p>
      </div>
      <div className="pl-9 space-y-2">
        {!open &&
          category &&
          category.todos.map((todo: Todo) => (
            <Todo key={todo.id} todo={todo} />
          ))}
      </div>
    </div>
  );
}
