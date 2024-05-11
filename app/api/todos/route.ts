import prisma from "@/lib/db/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession();

  if (!session?.user) {
    return NextResponse.json({ message: "Invalid session" }, { status: 400 });
  }

  const { title, date, category, newCategory } = await req.json();

  if (newCategory && category.toLowerCase().trim() === "createnew") {
    return NextResponse.json(
      { message: "New category cannot be named Create New" },
      { status: 400 }
    );
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email || "",
    },
  });

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 400 });
  }

  let categoryId;

  if (category === "Create new") {
    const existingCategory = await prisma.category.findFirst({
      where: {
        authorId: user.id,
        name: newCategory,
      },
    });

    if (existingCategory) {
      return NextResponse.json(
        { message: "Category already exists" },
        { status: 400 }
      );
    }

    console.log("Here");

    const createdCategory = await prisma.category.create({
      data: {
        name: newCategory,
        authorId: user.id,
      },
    });

    categoryId = createdCategory.id;
  } else {
    const existingCategory = await prisma.category.findFirst({
      where: {
        authorId: user.id,
        name: category,
      },
    });

    if (!existingCategory) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 400 }
      );
    }

    categoryId = existingCategory.id;
  }

  const todo = await prisma.todo.create({
    data: {
      due: date,
      title,
      categoryId,
    },
  });

  console.log(todo);

  return NextResponse.json(todo, { status: 201 });
}

// export async function GET(req: Request) {
//   const session = await getServerSession();

//   if (!session?.user) {
//     return NextResponse.json({ message: "Invalid session" }, { status: 400 });
//   }

//   const user = await prisma.user.findFirst({
//     where: {
//       email: session.user?.email ?? "",
//     },
//   });

//   if (!user) {
//     return NextResponse.json({ message: "User not found" }, { status: 400 });
//   }

//   const todos = await prisma.todo.findMany({
//     where: {
//       userId: user.id,
//     },
//   });

//   return NextResponse.json(todos, { status: 200 });
// }
