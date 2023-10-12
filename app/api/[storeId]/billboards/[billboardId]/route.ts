import db from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";




export async function GET(reg: Request, { params }: { params: { billboardId:string } }) {

    try {

        if (!params.billboardId) {
            return new NextResponse("Billboard  is Required", { status: 400 });
        }

        const billboard = await db.billboard.findUnique({
            where: {
                id: params.billboardId,
            }
        });

        return NextResponse.json(billboard);

    } catch (error) {
        console.log("[BILLBOARD_GET]", error);
        return new NextResponse("Interal Error", { status: 500 })

    }

}


export async function PATCH(reg: Request, { params }: { params: {billboardId:string, storeId: string } }) {

    try {

        const { userId } = auth();
        const body = await reg.json();

        const { label,imageUrl } = body

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!label) {
            return new NextResponse("Label is Required", { status: 400 });
        }

        if (!imageUrl) {
            return new NextResponse("Image is Required", { status: 400 });
        }

        if (!params.billboardId) {
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


        const billboard = await db.billboard.updateMany({
            where: {
                id: params.billboardId,
            },
            data: {
                label,
                imageUrl
            }
        });

        return NextResponse.json(billboard);

    } catch (error) {
        console.log("[STORES_PATCH]", error);
        return new NextResponse("Interal Error", { status: 500 })



    }

}


    export async function DELETE(reg: Request, { params }: { params: { billboardId:string, storeId: string } }) {

        try {
    
            const { userId } = auth();
      
    
            if (!userId) {
                return new NextResponse("Unauthorized", { status: 401 });
            }
    
    
            if (!params.billboardId) {
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
    
            const billboard = await db.billboard.deleteMany({
                where: {
                    id: params.billboardId,
                }
            });
    
            return NextResponse.json(billboard);
    
        } catch (error) {
            console.log("[BILLBOARD_DELETE]", error);
            return new NextResponse("Interal Error", { status: 500 })
    
    
    
        }
    



}