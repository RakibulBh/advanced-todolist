import prisma from "@/lib/db/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {}

export async function GET(req: Request) {
  const session = await getServerSession();

  if (!session) {
    return;
  }

  const user = await prisma.user.findFirst({
    where: {
      email: session.user?.email ?? "",
    },
  });

  if (!user) {
    return;
  }

  const todos = await prisma.todo.findMany({
    where: {
      userId: user.id,
    },
  });

  return NextResponse.json(todos, { status: 200 });
}
