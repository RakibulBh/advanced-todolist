
import { prisma } from "@/lib/db/client";


export const createTodo = async() => {
    const newTodo = await prisma.todo.create({
        data: {
            title: 'Wash the dishes',
            due: new Date('2022-12-31'),
        },
    });

    console.log(newTodo);
}

export const getTodos = async() => {
    const todos = await prisma.todo.findMany()

    return todos;
}

