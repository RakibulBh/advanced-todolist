"use client";

import { useRouter } from "next/navigation";

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
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

// TODO: get input values from the form

const formSchema = z
  .object({
    title: z.string(),
    date: z.string(),
    category: z.string(),
    newCategory: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.category === "Create new") {
        return !!data.newCategory;
      }
      return true;
    },
    {
      message: "Please enter a new category",
      path: ["newCategory"],
    }
  );

interface ModalProps {
  todo?: Todo;
  mode: "create" | "edit";
}

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

export default function CreateTodoDialog({ todo, mode }: ModalProps) {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: todo?.title ? todo.title : "",
      date: todo?.due ? todo.due : "",
      newCategory: "",
    },
  });

  const category = form.watch("category");

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    const res = await fetch("http://localhost:3000/api/todos", {
      method: "POST",
      body: JSON.stringify(values),
    });

    if (res.ok) {
      toast.success("Successfully created a todo! 🎉");
      router.push("/todos");
      router.refresh();
    } else {
      toast.error("Failed to create a todo 😢");
    }
  };

  const handleEdit = async (values: z.infer<typeof formSchema>) => {
    const id = todo?.id;
    const res = await fetch("http://localhost:3000/api/todos", {
      method: "PUT",
      body: JSON.stringify({ values, id }),
    });

    if (res.ok) {
      toast.success("Successfully edited a todo! 🎉");
      router.push("/todos");
      router.refresh();
    } else {
      toast.error("Failed to edit todo 😢");
    }
  };

  const [categories, setCategories] = useState([] as Category[]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch("http://localhost:3000/api/categories");
      const data = await res.json();
      setCategories(data);
    };

    fetchCategories();
  }, []);

  return (
    <Dialog>
      <DialogTrigger
        className={cn(
          mode !== "edit"
            ? "flex gap-x-1 hover:cursor-pointer"
            : "bg-blue-200 p-1 rounded-md hover:cursor-pointer"
        )}
      >
        {mode === "edit" ? (
          <PencilLine className="text-blue-500" />
        ) : (
          <Plus className="text-blue-500" />
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new todo</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            className="w-full flex flex-col gap-4"
            onSubmit={
              mode !== "edit"
                ? form.handleSubmit(handleSubmit)
                : form.handleSubmit(handleEdit)
            }
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
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
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
                        <Input
                          placeholder="New category"
                          type="text"
                          {...field}
                        />
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
      </DialogContent>
    </Dialog>
  );
}
