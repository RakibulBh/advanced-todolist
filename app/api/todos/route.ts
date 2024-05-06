import { prisma } from "@/lib/db/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
   try {

    const {title, due} = await req.json();

    const newPost = await prisma.todo.create({
        data: {
            title, due
        }
    })

    return NextResponse.json(newPost, {status: 201});

   } catch(error) {
        return NextResponse.json({message: 'Something went wrong'}, {status: 500});
   }
}