import db from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";




export async function GET(reg: Request, { params }: { params: { sizeId:string } }) {

    try {

        if (!params.sizeId) {
            return new NextResponse("Size  is Required", { status: 400 });
        }

        const size = await db.size.findUnique({
            where: {
                id: params.sizeId,
            }
        });

        return NextResponse.json(size);

    } catch (error) {
        console.log("[SIZES_GET]", error);
        return new NextResponse("Interal Error", { status: 500 })

    }

}


export async function PATCH(reg: Request, { params }: { params: {sizeId:string, storeId: string } }) {

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

        if (!params.sizeId) {
            return new NextResponse("Size  is Required", { status: 400 });
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
                id: params.sizeId,
            },
            data: {
                name,
                value
            }
        });

        return NextResponse.json(size);

    } catch (error) {
        console.log("[SIZES_PATCH]", error);
        return new NextResponse("Interal Error", { status: 500 })



    }

}


    export async function DELETE(reg: Request, { params }: { params: { sizeId:string, storeId: string } }) {

        try {
    
            const { userId } = auth();
      
    
            if (!userId) {
                return new NextResponse("Unauthorized", { status: 401 });
            }
    
    
            if (!params.sizeId) {
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
    
            const size= await db.size.deleteMany({
                where: {
                    id: params.sizeId,
                }
            });
    
            return NextResponse.json(size);
    
        } catch (error) {
            console.log("[SIZES_DELETE]", error);
            return new NextResponse("Interal Error", { status: 500 })
    
    
    
        }
    



}