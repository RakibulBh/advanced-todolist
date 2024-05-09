import prisma from "@/lib/db/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const session = await getServerSession();

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: session?.user?.email ?? "",
      },
    });

    const urlParams = new URLSearchParams(req.url.split("?")[1]);
    const category = urlParams.get("categoryId");

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const findCategory = await prisma.category.findFirst({
      where: {
        name: category ?? undefined,
        authorId: user?.id,
      },
    });

    if (!findCategory) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 }
      );
    }

    const todos = await prisma.todo.findMany({
      where: {
        categoryId: findCategory.id,
        due: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
          lt: new Date(new Date().setHours(24, 0, 0, 0)),
        },
      },
    });

    console.log(todos);

    return NextResponse.json(todos, { status: 201 });
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
