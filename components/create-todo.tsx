"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { Plus } from "lucide-react";
import { useState } from "react";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { SelectScrollable } from "./select";

export default function CreateTodoDialog() {
  const [showNewCategory, setShowNewCategory] = useState(false);
  const [category, setCategory] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const data = {
      title: e.target.title?.value,
      date: e.target.date?.value,
      category: category,
      newCategory: e.target.newCategory?.value,
    };

    if (
      data.title?.trim() == "" ||
      data.date?.trim() == "" ||
      data.category?.trim() == ""
    ) {
      return;
    }

    try {
      const res = await fetch("/api/todos", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        console.log("Todo created successfully");
      } else {
        console.error("Something went wrong");
      }
    } catch (e) {
      console.log(e);
    }
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
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-y-5">
          <Input id="title" name="title" placeholder="Title" />
          <Input
            id="date"
            name="date"
            placeholder="Date"
            className="w-full"
            type="date"
          />
          <SelectScrollable
            setCategory={setCategory}
            setShowNewCategory={setShowNewCategory}
          />
          {showNewCategory && (
            <>
              <Label htmlFor="new-category">New category</Label>
              <Input
                id="newCategory"
                name="new-category"
                placeholder="New category title"
                className="w-full"
                type="text"
              />
            </>
          )}
          <Button type="submit">Submit</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
