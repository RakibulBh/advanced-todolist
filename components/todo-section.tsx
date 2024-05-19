import { ChevronDown, ChevronUp } from "lucide-react";
import { Todo } from "./todo";

export default function TodoSection() {
  return (
    <div className="flex flex-col w-full gap-y-2">
      <div className="flex gap-x-3 items-center">
        <ChevronDown />
        <p className="font-bold text-xl">Skincare</p>
        <p className="text-gray-500 text-xl">4</p>
      </div>
      <div className="pl-9">
        <Todo />
      </div>
    </div>
  );
}
