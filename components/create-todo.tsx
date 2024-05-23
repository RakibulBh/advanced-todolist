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
import { createTodo, getCategories } from "@/app/todos/actions";
import { Category } from "@/types/custom";

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
  .refine(
    (data) => {
      if (data.date === "") {
        return false;
      }
      return true;
    },
    {
      message: "Date cannot be empty",
      path: ["date"],
    }
  );

function FormContent() {
  const [categories, setCategories] = useState<Category[] | null>();

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
      title: "",
      date: "",
    },
  });

  const category = form.watch("category");

  const handleSubmit = async (data: any) => {
    if (data.category === "Create new") {
      data.category = null;
    } else {
      data.newCategory = null;
    }
    await createTodo(data);
    formRef.current?.reset();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        ref={formRef}
        className="w-full flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Title" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <Input placeholder="Date" type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value); // Ensures value is passed to form control
                    form.setValue("category", value); // Sets value directly to the form
                  }}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories &&
                      categories.map((category: any) => (
                        <SelectItem key={category.id} value={category.name}>
                          {category.name}
                        </SelectItem>
                      ))}
                    <SelectItem value="Create new">Create new</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        {category === "Create new" && (
          <FormField
            control={form.control}
            name="newCategory"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>New category</FormLabel>
                  <FormControl>
                    <Input placeholder="New category" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        )}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export default function CreateTodoDialog() {
  return (
    <Dialog>
      <DialogTrigger className="flex gap-x-1 hover:cursor-pointer">
        <Plus className="text-blue-500" />
        Add a todo
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new todo</DialogTitle>
        </DialogHeader>
        <FormContent />
      </DialogContent>
    </Dialog>
  );
}
