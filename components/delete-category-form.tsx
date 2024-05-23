"use client";
import { deleteCategory } from "@/app/categories/actions";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";

export const DeleteCategoryForm = ({ id }: { id: number }) => {
  return (
    <form>
      <Button
        formAction={() => deleteCategory(id)}
        className="bg-red-200 p-1 rounded-md hover:cursor-pointer hover:bg-white "
      >
        <Trash2 className="text-red-500" />
      </Button>
    </form>
  );
};
