import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { Plus } from "lucide-react";
import { FormEvent } from "react";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { SelectScrollable } from "./select";

export default function CreateTodoDialog() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
        <form className="w-full flex flex-col gap-y-5">
          <Label htmlFor="title">Email</Label>
          <Input id="title" name="title" placeholder="Title" />
          <Label htmlFor="date">Email</Label>
          <Input
            id="date"
            name="date"
            placeholder="Date"
            className="w-full"
            type="date"
          />
          <Label htmlFor="category">Category</Label>
          <SelectScrollable />
          <Button type="submit">Submit</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
