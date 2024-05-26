"use client";

import { toast } from "react-hot-toast";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { PencilLine, Plus } from "lucide-react";
import { Button } from "./ui/button";
import {
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
  Select,
} from "@/components/ui/select";
import { useEffect, useRef, useState } from "react";
import {
  createCategory,
  createTodo,
  getCategories,
  getCategory,
  updateTodo,
} from "@/app/todos/actions";
import { Category, Todo } from "@/types/custom";
import { formatDate } from "@/lib/utils";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/router";

const formSchema = z
  .object({
    title: z.string().min(3),
    date: z.string(),
    category: z.string(),
    newCategory: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.newCategory?.toLowerCase().split(" ").join("") === "createnew") {
        return false;
      } else if (data.category === "Create new" && !data.newCategory) {
        return false;
      }
      return true;
    },
    {
      message: "New category cannot be empty or named 'Create new'.",
      path: ["newCategory"],
    }
  )
  .refine((data) => data.date !== "", {
    message: "Date cannot be empty",
    path: ["date"],
  });

function FormContent({
  form,
  categories,
  category,
}: {
  mode: "add" | "edit";
  todo?: Todo | null;
  form: any;
  categories: any;
  category: any;
}) {
  const { pending } = useFormStatus();

  return (
    <>
      <FormField
        disabled={pending}
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input placeholder="Title" type="text" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        disabled={pending}
        control={form.control}
        name="date"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Date</FormLabel>
            <FormControl>
              <Input placeholder="Date" type="date" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        disabled={pending}
        control={form.control}
        name="category"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Category</FormLabel>
            <Select
              onValueChange={(value) => {
                field.onChange(value);
                form.setValue("category", value);
              }}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {categories?.map((category: Category) => (
                  <SelectItem key={category.id} value={category.name}>
                    {category.name}
                  </SelectItem>
                ))}
                <SelectItem value="Create new">Create new</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      {category === "Create new" && (
        <FormField
          disabled={pending}
          control={form.control}
          name="newCategory"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New category</FormLabel>
              <FormControl>
                <Input placeholder="New category" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
      <Button disabled={pending} type="submit">
        Submit
      </Button>
    </>
  );
}

export default function CreateTodoDialog({
  mode,
  todo,
}: {
  mode: "add" | "edit";
  todo?: Todo;
}) {
  const [categories, setCategories] = useState<Category[] | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      const fetched_categories = await getCategories();
      setCategories(fetched_categories);
    };

    fetchCategories();
  }, []);

  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: todo ? todo.title : "",
      date: todo ? formatDate(todo.due) : "",
      category: todo
        ? categories?.find((cat) => cat.id === todo.category_id)?.name || ""
        : "",
      newCategory: "",
    },
  });

  const category = form.watch("category");

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    if (
      !data.category ||
      !data.date ||
      !data.title ||
      (data.category === "Create new" && data.newCategory?.trim() === "")
    ) {
      toast.error("Please fill all the fields");
      return;
    }

    let categoryId: number;

    if (data.category === "Create new" && data.newCategory) {
      const createdCategory = await createCategory(data.newCategory);
      if (createdCategory instanceof Error) {
        toast.error("Error occurred while creating new category");
        return;
      } else {
        categoryId = createdCategory.id;
      }
    } else {
      categoryId = await getCategory(data.category);
    }

    if (!categoryId) {
      toast.error("Error occurred while fetching or creating category");
      return;
    }

    const todoData = {
      title: data.title,
      due: data.date,
      category_id: categoryId,
    };

    if (!todo) {
      await createTodo({
        ...todoData,
      });
    } else {
      await updateTodo({
        ...todo,
        ...todoData,
      });
    }

    formRef.current?.reset();
  };

  return (
    <Dialog>
      <DialogTrigger className="flex gap-x-1 hover:cursor-pointer">
        {mode === "add" ? (
          <>
            <Plus className="text-blue-500" />
            Add a todo
          </>
        ) : (
          <div className="bg-blue-200 p-1 rounded-md">
            <PencilLine className="text-blue-500" />
          </div>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {mode === "add" ? "Create a new todo" : "Edit todo"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            ref={formRef}
            className="w-full flex flex-col gap-4"
          >
            <FormContent
              categories={categories}
              form={form}
              todo={todo || null}
              category={category}
              mode={mode}
            />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
