"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

type Todo = {
  id: string;
  title: string;
  due: string;
  done: boolean;
};

export async function createTodo(formData: any) {
  const supabase = await createClient();

  const { title, date, category, newCategory } = formData;

  if (
    !title ||
    !date ||
    (category == null && newCategory.trim() === "") ||
    (newCategory == null && category.trim() === "")
  ) {
    throw new Error("Please fill in all fields");
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("You must be logged in to create a todo");
  }

  let todo_category;

  const categories = await getCategories();

  if (!categories) {
    throw new Error("Error fetching user categories");
  }

  if (category == null && newCategory !== null) {
    const created_category = await createCategory(newCategory);
    todo_category = created_category.id;
  } else if (newCategory == null && category !== null) {
    for (const cat of categories) {
      if (cat.name === category) {
        todo_category = cat.id;
      }
    }
  }

  const { data, error } = await supabase
    .from("todos")
    .insert({ title, due: date, category_id: todo_category })
    .select();

  if (error && !data) {
    throw new Error("Error occured while creating todo");
  }

  revalidatePath("/todos");
}

export async function createCategory(category: String) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("You must be logged in to create a todo");
  }

  const categories = await getCategories();

  if (!categories || !category) {
    return Error("Error fetching user categories");
  }

  for (const cat of categories) {
    if (cat.name === category) {
      throw new Error("Category already exists");
    }
  }

  const { data, error } = await supabase
    .from("categories")
    .insert({ user_id: user.id, name: category })
    .select();

  if (error) {
    throw new Error("Error occured while creating category");
  } else {
    return data[0];
  }
}

export async function getCategories() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("You must be logged in to create a todo");
  }

  const { data: categories } = await supabase.from("categories").select();

  return categories;
}
