import TodoSection from "@/components/todo-section";
import CreateTodoDialog from "@/components/create-todo";
import { set } from "zod";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Category } from "@/types/custom";

export default async function SectionContent() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const { data: categories, error } = await supabase.from("categories").select(`
    *,
    todos (
      *
    )
  `);

  if (error) {
    throw new Error("Error occured while fetching categories and todos");
  }

  return (
    <div className="p-5 md:p-10 space-y-14 w-full h-full">
      <div className="flex gap-x-3">
        <span className="text-3xl">📦</span>
        <span className="font-extrabold text-3xl">My Todos</span>
      </div>
      <CreateTodoDialog mode="add" />
      {categories &&
        categories.map((category: Category) => (
          <TodoSection key={category.id} category={category} />
        ))}
      <div className="pb-20" />
    </div>
  );
}
