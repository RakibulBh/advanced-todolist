import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {

        const body = await req.json()
        const { email, username, password} = body;
        
    } catch (error) {

    }
}