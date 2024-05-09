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
import { set } from "react-hook-form";

export function SelectScrollable({ setShowNewCategory, setCategory }: any) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await fetch("/api/category", {
          method: "GET",
        });

        if (response.ok) {
          const categoriesFound = await response.json();
          setCategories(categoriesFound);
        }
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };

    setShowNewCategory(false);
    getCategories();
  }, []);

  const handleSelectChange = (value: any) => {
    if (value === "new") {
      setShowNewCategory(true);
    } else {
      setShowNewCategory(false);
      setCategory(value);
    }
  };

  return (
    <Select onValueChange={handleSelectChange}>
      <SelectTrigger>
        <SelectValue placeholder="Select a category" />
      </SelectTrigger>
      <SelectContent>
        {categories.map((category) => (
          <SelectItem value={`${category.name}`}>{category.name}</SelectItem>
        ))}
        <SelectItem className="flex flex-row " value="new">
          Create new category
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
