import { NextResponse } from "next/server";
import prisma from "@/lib/db/client";
import { hash } from "bcrypt";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

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
