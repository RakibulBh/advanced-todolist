"use client";

import TodoSection from "@/components/todo-section";
import CreateTodoDialog from "@/components/create-todo";
import { useEffect, useState } from "react";

export default function SectionContent() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const getTodos = async () => {
      try {
        const response = await fetch("/api/todos", {
          method: "GET",
        });

        if (response.ok) {
          const todos = await response.json();
          console.log(todos);
          setTodos(todos);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getTodos();
  }, []);

  return (
    <div className="p-10 space-y-14 w-full h-full">
      <div className="flex gap-x-3">
        <span className="text-3xl">📦</span>
        <span className="font-extrabold text-3xl">Todo list</span>
      </div>
      <CreateTodoDialog />
      <TodoSection todos={todos} title="Today" />
      <TodoSection todos={todos} title="This week" />
      <TodoSection todos={todos} title="Later" />
    </div>
  );
}
