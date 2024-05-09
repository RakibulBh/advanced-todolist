"use client";

import TodoSection from "@/components/todo-section";
import CreateTodoDialog from "@/components/create-todo";
import { useParams } from "next/navigation";
import { use, useEffect, useState } from "react";

export default function SectionContent() {
  const params = useParams();
  const { id } = params;
  const decodedId = decodeURIComponent(Array.isArray(id) ? id[0] : id);

  const [todayTodos, setTodos] = useState([]);

  useEffect(() => {
    const getTodayTodos = async () => {
      try {
        const url = `/api/todos/today?categoryId=${decodedId}`;

        const response = await fetch(url, {
          method: "GET",
        });

        if (response.ok) {
          console.log(todayTodos);
          const todos = await response.json();
          setTodos(todos);
        }
      } catch (error) {
        console.error("Failed to fetch today's todos", error);
      }
    };

    getTodayTodos();
  }, []);

  return (
    <div className="p-10 space-y-14 w-full h-full">
      <div className="flex gap-x-3">
        <span className="text-3xl">📦</span>
        <span className="font-extrabold text-3xl">{decodedId}</span>
      </div>
      <CreateTodoDialog />
      <TodoSection todos={todayTodos} title="Today" />
      {/* <TodoSection title="This week" />
      <TodoSection title="This month" />
      <TodoSection title="Later" /> */}
    </div>
  );
}
