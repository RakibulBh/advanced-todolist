import TodoSection from "@/components/todo-section";
import CreateTodoDialog from "@/components/create-todo";
import { useEffect, useState } from "react";
import { set } from "zod";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

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

export default async function SectionContent() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }
  // const [categories, setCategories] = useState<Category[] | null>(null);
  // const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       setLoading(true);
  //       const res = await fetch("http://localhost:3000/api/categories");
  //       if (!res.ok) {
  //         toast.error(`Failed to fetch data. Error code: ${res.status}`);
  //       }
  //       const data = await res.json();
  //       setCategories(data);
  //     } catch (err: any) {
  //       toast.error(err.message);
  //     }

  //     setLoading(false);
  //   };

  //   getData();
  // }, []);

  return (
    <div className="p-10 space-y-14 w-full h-full">
      <div className="flex gap-x-3">
        <span className="text-3xl">📦</span>
        <span className="font-extrabold text-3xl">My Todos</span>
      </div>
      {/* <CreateTodoDialog mode="create" /> */}
      {/* {loading && (
        <div className="w-full flex justify-center items-center">
          <p>Loading...</p>
        </div>
      )}
      {!loading && <p>Hey</p>} */}
    </div>
  );
}
