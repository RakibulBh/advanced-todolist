"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

export function SelectScrollable({ setShowNewCategory }: any) {
  useEffect(() => {
    setShowNewCategory(false);
  }, []);

  const handleSelectChange = (value: any) => {
    if (value === "new") {
      setShowNewCategory(true);
    } else {
      setShowNewCategory(false);
    }
  };

  return (
    <Select onValueChange={handleSelectChange}>
      <SelectTrigger>
        <SelectValue placeholder="Select a category" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="m@example.com">m@example.com</SelectItem>
        <SelectItem value="m@google.com">m@google.com</SelectItem>
        <SelectItem value="m@support.com">m@support.com</SelectItem>
        <SelectItem className="flex flex-row " value="new">
          Create new category
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
