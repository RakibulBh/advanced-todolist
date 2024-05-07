import { Plus } from "lucide-react";
import Image from "next/image";

import TodoSection from "@/components/todo-section";
import { todoSectionCategories } from "@/lib/data";

export default function SectionContent() {
  return (
    <div className="p-10 space-y-16 w-full h-full">
      <div className="flex gap-x-3">
        <span className="text-3xl">📦</span>
        <span className="font-extrabold text-3xl">Personal</span>
      </div>
      <div className="flex gap-x-1 hover:cursor-pointer">
        <Plus className="text-blue-500" />
        <p>New task</p>
      </div>
      {todoSectionCategories.map((category) => (
        <TodoSection key={category} category={category} />
      ))}
    </div>
  );
}
