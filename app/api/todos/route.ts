import prisma from "@/lib/db/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession();

  try {
    const { title, date, category, newCategory } = await req.json();

    const isoDateTime = new Date(date).toISOString();

    const user = await prisma.user.findUnique({
      where: {
        email: session?.user?.email ?? "",
      },
    });

    if (newCategory) {
      const newCat = await prisma.category.findFirst({
        where: {
          name: newCategory,
        },
      });

      if (newCat) {
        return NextResponse.json(
          { message: "Category already exists" },
          { status: 400 }
        );
      }
    }

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    let data: any = {};

    if (newCategory) {
      const newCat = await prisma.category.create({
        data: {
          authorId: user.id,
          name: newCategory,
        },
      });
      data = {
        title,
        due: isoDateTime,
        categoryId: newCat.id,
      };
    } else {
      const categoryFound = await prisma.category.findFirst({
        where: {
          name: category,
        },
      });
      data = {
        title,
        due: isoDateTime,
        categoryId: categoryFound?.id,
      };
    }

    const newTodo = await prisma.todo.create({
      data,
    });

    console.log(newTodo);

    return NextResponse.json(
      { message: "Successfully created a todo!" },
      { status: 201 }
    );
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
