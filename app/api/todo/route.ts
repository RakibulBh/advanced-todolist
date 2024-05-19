import prisma from "@/lib/db/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  const session = await getServerSession();

  if (!session?.user) {
    return NextResponse.json({ message: "Invalid session" }, { status: 400 });
  }

  const { id } = await req.json();

  const todo = await prisma.todo.findUnique({
    where: {
      id,
    },
  });

  if (!todo) {
    return NextResponse.json({ message: "Todo not found" }, { status: 400 });
  }

  const updatedTodo = await prisma.todo.update({
    where: {
      id,
    },
    data: {
      done: !todo.done,
    },
  });

  return NextResponse.json(updatedTodo, { status: 200 });
}
