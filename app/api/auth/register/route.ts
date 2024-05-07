import { NextResponse } from "next/server";
import prisma from "@/lib/db/client";
import { hash } from "bcrypt";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      return NextResponse.json({
        message: "Email already in use",
        status: 400,
      });
    }

    const hashedPassword = await hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ message: e.message });
  }
}
