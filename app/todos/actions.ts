"use server";

import { Category, Todo } from "@/types/custom";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

// Define types for function parameters
interface FormData {
  title: string;
  date: string;
  category: string | null;
  newCategory: string | null;
}

export async function createTodo({
  title,
  due,
  category_id,
}: {
  title: string;
  due: string;
  category_id: number;
}): Promise<void> {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("You must be logged in to create a todo");
  }

  const { data, error } = await supabase
    .from("todos")
    .insert({ title, due, category_id })
    .select();

  if (error || !data) {
    throw new Error("Error occurred while creating todo");
  }

  revalidatePath("/todos");
}

export async function createCategory(
  category: string
): Promise<Category | Error> {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("You must be logged in to create a category");
  }

  const categories = await getCategories();

  if (!categories) {
    throw new Error("Error fetching user categories");
  }

  if (categories.some((cat) => cat.name === category)) {
    throw new Error("Category already exists");
  }

  const { data, error } = await supabase
    .from("categories")
    .insert({ user_id: user.id, name: category })
    .select();

  if (error) {
    throw new Error("Error occurred while creating category");
  }

  return data[0];
}

export async function getCategories(): Promise<Category[]> {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("You must be logged in to retrieve categories");
  }

  const { data, error } = await supabase.from("categories").select();

  if (error) {
    throw new Error("Error occurred while fetching categories");
  }

  return data;
}

export async function deleteTodo(
  id: number,
  category_id: number
): Promise<void> {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("You must be logged in to delete a todo");
  }

  const { error } = await supabase
    .from("todos")
    .delete()
    .match({ id, category_id });

  if (error) {
    throw new Error("Error occurred while deleting todo");
  }

  revalidatePath("/todos");
}

export async function getCategory(name: string): Promise<number> {
  const categories = await getCategories();

  if (!categories) {
    throw new Error("Error fetching user categories");
  }

  const category = categories.find((cat) => cat.name === name);

  if (!category) {
    throw new Error("Category not found");
  }

  return category.id;
}

export async function updateTodo(todo: Todo): Promise<void> {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("You must be logged in to update a todo");
  }

  const { id, ...updateData } = todo;

  const { data, error } = await supabase
    .from("todos")
    .update(updateData)
    .match({ id });

  if (error) {
    throw new Error("Error occurred while updating todo");
  }

  revalidatePath("/todos");
}
