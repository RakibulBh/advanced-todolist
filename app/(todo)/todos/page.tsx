"use client";
import TodoSection from "@/components/todo-section";
import CreateTodoDialog from "@/components/create-todo";
import { useEffect, useState } from "react";
import { set } from "zod";
import { cn } from "@/lib/utils";

interface Todo {
  id: string;
  title: string;
  due: string;
  done: boolean;
}
interface Category {
  id: string;
  name: string;
  todos: Todo[];
}

export default function SectionContent() {
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:3000/api/categories");
        if (!res.ok) {
          throw new Error(`Error: ${res.status}`);
        }
        const data = await res.json();
        setCategories(data);
      } catch (err: any) {
        setError(err.message);
      }

      setLoading(false);
    };

    getData();
  }, []);

  return (
    <div className="p-10 space-y-14 w-full h-full">
      <div className="flex gap-x-3">
        <span className="text-3xl">📦</span>
        <span className="font-extrabold text-3xl">Todo list</span>
      </div>
      <CreateTodoDialog />
      {loading && (
        <div className="w-full flex justify-center items-center">
          <p>Loading...</p>
        </div>
      )}
      {!loading && !error && (
        <>
          {categories &&
            categories.map((cateogry) => (
              <TodoSection key={cateogry.id} category={cateogry} />
            ))}
        </>
      )}
    </div>
  );
}
