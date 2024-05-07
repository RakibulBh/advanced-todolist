import TodoSection from "@/components/todo-section";
import CreateTodoDialog from "@/components/create-todo";

export default function SectionContent() {
  return (
    <div className="p-10 space-y-14 w-full h-full">
      <div className="flex gap-x-3">
        <span className="text-3xl">📦</span>
        <span className="font-extrabold text-3xl">Personal</span>
      </div>
      <CreateTodoDialog />
      <TodoSection key="Dog" category="Today" />
    </div>
  );
}
