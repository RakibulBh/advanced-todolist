"use client";
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

import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import {
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
  Select,
} from "@/components/ui/select";

// TODO: get input values from the form

const formSchema = z
  .object({
    title: z.string(),
    date: z.string(),
    category: z.enum(["work", "Create new"]),
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

export default function CreateTodoDialog() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      date: "",
      newCategory: "",
    },
  });

  const category = form.watch("category");

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    console.log({ values });
  };

  return (
    <Dialog>
      <DialogTrigger className="flex gap-x-1 hover:cursor-pointer">
        <Plus className="text-blue-500" />
        New task
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new todo</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            className="w-full flex flex-col gap-4"
            onSubmit={form.handleSubmit(handleSubmit)}
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
                        <SelectItem value="work">Work</SelectItem>
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
