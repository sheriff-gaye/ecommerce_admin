import db from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";


export async function POST(reg: Request, { params }: { params: { storeId: string } }) {

    try {

        const { userId } = auth();
        const body = await reg.json();

        const { name, value } = body

        if (!userId) {
            return new NextResponse("Unaunthicated", { status: 401 });
        }

        if (!name) {
            return new NextResponse("Name is Required", { status: 400 });
        }

        if (!value) {
            return new NextResponse("Name is Required", { status: 400 });
        }

        if (!params.storeId) {
            return new NextResponse("Store ID is Required", { status: 400 });
        }

        const storeByUserId = await db.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        });

        if (!storeByUserId) {
            return new NextResponse("Unauthorized", { status: 403 });
        }


        const color = await db.color.create({
            data: {
                name,
                value,
                storeId: params.storeId
            }
        });

        return NextResponse.json(color);

    } catch (error) {
        console.log("[COLORS POST]", error);
        return new NextResponse("Interal Error", { status: 500 })



    }

}




export async function GET(reg: Request, { params }: { params: { storeId: string } }) {

    try {

        if (!params.storeId) {
            return new NextResponse("Store ID is Required", { status: 400 });
        }



        const colors = await db.color.findMany({
            where: {
                id: params.storeId
            }
        });

        return NextResponse.json(colors);

    } catch (error) {
        console.log("[COLORS_GET]", error);
        return new NextResponse("Interal Error", { status: 500 })



    }

}