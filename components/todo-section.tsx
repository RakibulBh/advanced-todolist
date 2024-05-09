"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { Key, useEffect, useState } from "react";
import { Todo } from "@/components/todo";

export default function TodoSection({ title, todos }: any) {
  const [showTodos, setShowTodos] = useState(false);

  const toggleShowTodos = () => {
    setShowTodos(!showTodos);
  };

  return (
    <div className="w-full space-y-2">
      <div className="flex gap-x-2">
        <button onClick={toggleShowTodos}>
          {showTodos ? <ChevronUp /> : <ChevronDown />}
        </button>
        <h1 className="w-full border-b-2 border-gray-200 pb-2">{title}</h1>
      </div>
      {todos && (
        <div className="ml-8">
          {!showTodos && (
            <div className="flex flex-col">
              {todos.map((todo: any) => (
                <Todo key={todo.id} title={todo.title} done={todo.done} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
