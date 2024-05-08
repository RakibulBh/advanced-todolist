import { NextResponse } from "next/server";
import prisma from "@/lib/db/client";
import { getServerSession } from "next-auth";

export async function GET(req: Request) {
  const session = await getServerSession();

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: session?.user?.email ?? "",
      },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const categories = await prisma.category.findMany({
      where: {
        authorId: user.id,
      },
    });

    return NextResponse.json(categories, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
