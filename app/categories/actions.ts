"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export const deleteCategory = async (id: number) => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("You must be logged in to delete a todo");
  }

  console.log(id);

  const { data, error } = await supabase
    .from("categories")
    .delete()
    .match({ id })
    .select();

  if (error) {
    console.log(error);
    throw new Error("Error occurred while deleting category");
  }

  console.log(data);

  revalidatePath("/todos");
};
