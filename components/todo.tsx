import { cn } from "@/lib/utils";
import { Square, SquareCheckBig } from "lucide-react";

export const Todo = ({title, done} : {title: string, done: boolean}) =>{
  return (
    <div className={cn('w-full p-2 flex gap-x-2 rounded-md', done && 'bg-gray-200')}>
        {done ? <SquareCheckBig/> : <Square />}
        <p>{title}</p>
    </div>
  )
}
