import { NextResponse } from "next/server";
import prisma from "@/lib/db/client";

export async function GET(req: Request) {
  try {
    const body = await req.json();
    const { email, username, password } = body;
  } catch (error) {}
}
