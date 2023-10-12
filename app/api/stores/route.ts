import db from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";


export async function POST(reg: Request) {


    try {
        const { userId } = auth();
        const body = await reg.json();
        const { name } = body;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!name) {
            return new NextResponse("Name is Required", { status: 400 });
        }

        const store = await db.store.create({
            data: {
                name,
                userId
            }
        });

        return NextResponse.json(store);

    } catch (error) {

        console.log("[STORES_POST]", error);
        return new NextResponse("Interal Error", { status: 500 })

    }
}