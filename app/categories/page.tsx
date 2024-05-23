import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import { DeleteCategoryForm } from "@/components/delete-category-form";

export default async function Categories() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const { data: categories, error } = await supabase
    .from("categories")
    .select();

  if (error) {
    toast.error("Error occured while fetching categories");
  }

  return (
    <div className="p-10 w-full h-full space-y-10">
      <h1 className=" text-xl md:text-3xl font-bold text-gray-600">
        My Categories
      </h1>
      <div className="flex flex-col gap-y-2">
        {categories &&
          categories.map((category) => (
            <div
              key={category.id}
              className="w-full flex justify-between py-3 px-2 rounded-md border-b-2 border-gray-300"
            >
              {category.name}
              <DeleteCategoryForm id={category.id} />
            </div>
          ))}
      </div>
    </div>
  );
}
