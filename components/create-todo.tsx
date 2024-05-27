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
import {
  createCategory,
  createTodo,
  getCategories,
  getCategory,
  updateTodo,
} from "@/app/todos/actions";
import { Category, Todo } from "@/types/custom";
import { formatDate } from "@/lib/utils";
import { Input } from "@/components/ui/input";

const formSchema = z
  .object({
    title: z.string().optional(),
    date: z.string().optional(),
    category: z.string().optional(),
    newCategory: z.string().optional(),
  })
  .refine(
    (data) => {
      console.log(data);
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

export default function CreateTodoDialog({
  mode,
  todo,
}: {
  mode: "add" | "edit";
  todo?: Todo;
}) {
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      const fetched_categories = await getCategories();
      setCategories(fetched_categories);
    };

    fetchCategories();
  }, [isOpen]);

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

    setIsSubmitting(true);

    try {
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

      form.reset();
      setIsOpen(false);
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: todo ? todo.title : "",
      date: todo ? formatDate(todo.due) : "",
      category: "",
      newCategory: "",
    },
  });

  const category = form.watch("category");

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
            className="w-full flex flex-col gap-4"
          >
            <FormField
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
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <Input
                      id="date"
                      placeholder="Date"
                      type="date"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
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
                control={form.control}
                name="newCategory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New category</FormLabel>
                    <FormControl>
                      <Input
                        id="category"
                        placeholder="New category"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <Button disabled={isSubmitting} type="submit">
              {isSubmitting ? "Submitting" : "Submit"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
