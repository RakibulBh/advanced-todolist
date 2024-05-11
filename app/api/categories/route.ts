import prisma from "@/lib/db/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const session = await getServerSession();

  if (!session?.user) {
    return NextResponse.json({ message: "Invalid session" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email || "",
    },
  });

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 400 });
  }

  const categories = await prisma.category.findMany({
    where: {
      authorId: user.id,
    },
    include: {
      todos: true,
    },
  });

  return NextResponse.json(categories, { status: 201 });
}
