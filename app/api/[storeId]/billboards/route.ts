import db from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";


export async function POST(reg: Request, { params }: { params: { storeId: string } }) {

    try {

        const { userId } = auth();
        const body = await reg.json();

        const { label, imageUrl } = body

        if (!userId) {
            return new NextResponse("Unaunthicated", { status: 401 });
        }

        if (!label) {
            return new NextResponse("Label is Required", { status: 400 });
        }

        if (!imageUrl) {
            return new NextResponse("Image is Required", { status: 400 });
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


        const billboard = await db.billboard.create({
            data: {
                label,
                imageUrl,
                storeId: params.storeId
            }
        });

        return NextResponse.json(billboard);

    } catch (error) {
        console.log("[BILLBOARD POST]", error);
        return new NextResponse("Interal Error", { status: 500 })



    }

}




export async function GET(reg: Request, { params }: { params: { storeId: string } }) {

    try {

        if (!params.storeId) {
            return new NextResponse("Store ID is Required", { status: 400 });
        }


       
        const billboards = await db.billboard.findMany({
          where:{
            id:params.storeId
          }
        });

        return NextResponse.json(billboards);

    } catch (error) {
        console.log("[BILLBOARD_GET]", error);
        return new NextResponse("Interal Error", { status: 500 })



    }

}