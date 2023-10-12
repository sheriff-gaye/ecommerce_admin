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


        const size = await db.size.create({
            data: {
                name,
                value,
                storeId: params.storeId
            }
        });

        return NextResponse.json(size);

    } catch (error) {
        console.log("[SIZES POST]", error);
        return new NextResponse("Interal Error", { status: 500 })



    }

}




export async function GET(reg: Request, { params }: { params: { storeId: string } }) {

    try {

        if (!params.storeId) {
            return new NextResponse("Store ID is Required", { status: 400 });
        }



        const sizes = await db.size.findMany({
            where: {
                id: params.storeId
            }
        });

        return NextResponse.json(sizes);

    } catch (error) {
        console.log("[SIZES_GET]", error);
        return new NextResponse("Interal Error", { status: 500 })



    }

}