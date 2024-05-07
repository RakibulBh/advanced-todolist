import prisma from "@/lib/db/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { title, due, category } = await req.json();

    const newTodo = await prisma.todo.create({
      data: {
        title,
        due,
        category,
      },
    });

    return NextResponse.json(newTodo, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
