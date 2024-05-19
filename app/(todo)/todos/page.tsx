import TodoSection from "@/components/todo-section";
import CreateTodoDialog from "@/components/create-todo";

interface Todo {
  id: string;
  name: string;
  date: string;
  completed: boolean;
}
interface Category {
  id: string;
  name: string;
  todos: Todo[];
}

export default async function SectionContent() {
  const getData = async () => {
    const res = await fetch("https://localhost:3000/api/categories");

    if (!res.ok) {
      console.log("Failed to fetch data");
    }

    return res.json();
  };

  const categories: Category[] = await getData();

  return (
    <div className="p-10 space-y-14 w-full h-full">
      <div className="flex gap-x-3">
        <span className="text-3xl">📦</span>
        <span className="font-extrabold text-3xl">Todo list</span>
      </div>
      <CreateTodoDialog />
      <TodoSection />
    </div>
  );
}
