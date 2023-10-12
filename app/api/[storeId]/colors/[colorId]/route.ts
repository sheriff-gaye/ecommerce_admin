import db from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";




export async function GET(reg: Request, { params }: { params: { colorId:string } }) {

    try {

        if (!params.colorId) {
            return new NextResponse("Colors  is Required", { status: 400 });
        }

        const color = await db.color.findUnique({
            where: {
                id: params.colorId,
            }
        });

        return NextResponse.json(color);

    } catch (error) {
        console.log("[COLORS_GET]", error);
        return new NextResponse("Interal Error", { status: 500 })

    }

}


export async function PATCH(reg: Request, { params }: { params: {colorId:string, storeId: string } }) {

    try {

        const { userId } = auth();
        const body = await reg.json();

        const { name,value } = body

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!name) {
            return new NextResponse("name is Required", { status: 400 });
        }

        if (!value) {
            return new NextResponse("Value is Required", { status: 400 });
        }

        if (!params.colorId) {
            return new NextResponse("Colors  is Required", { status: 400 });
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


        const size = await db.size.updateMany({
            where: {
                id: params.colorId,
            },
            data: {
                name,
                value
            }
        });

        return NextResponse.json(size);

    } catch (error) {
        console.log("[COLORS_PATCH]", error);
        return new NextResponse("Interal Error", { status: 500 })



    }

}


    export async function DELETE(reg: Request, { params }: { params: { colorId:string, storeId: string } }) {

        try {
    
            const { userId } = auth();
      
    
            if (!userId) {
                return new NextResponse("Unauthorized", { status: 401 });
            }
    
    
            if (!params.colorId) {
                return new NextResponse("Billboard  is Required", { status: 400 });
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
    
            const color= await db.color.deleteMany({
                where: {
                    id: params.colorId,
                }
            });
    
            return NextResponse.json(color);
    
        } catch (error) {
            console.log("[COLORS_DELETE]", error);
            return new NextResponse("Interal Error", { status: 500 })
    
    
    
        }
    



}