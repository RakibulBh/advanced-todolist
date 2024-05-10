import type { InferGetServerSidePropsType, GetServerSideProps } from "next";

import TodoSection from "@/components/todo-section";
import CreateTodoDialog from "@/components/create-todo";

type Todo = {
  id: string;
  title: string;
  date: string;
  category: string;
};

export default async function SectionContent() {
  const res = await fetch("http://localhost:3000//api/todos");
  const todos = await res.json();

  console.log(todos);

  return (
    <div className="p-10 space-y-14 w-full h-full">
      <div className="flex gap-x-3">
        <span className="text-3xl">📦</span>
        <span className="font-extrabold text-3xl">Todo list</span>
      </div>
      <CreateTodoDialog />
      {/* <TodoSection todos={todos} title="Today" />
      <TodoSection todos={todos} title="This week" />
      <TodoSection todos={todos} title="Later" /> */}
    </div>
  );
}
