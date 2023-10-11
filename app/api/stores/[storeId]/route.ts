import db from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";


export async function PATCH(reg: Request, { params }: { params: { storeId: string } }) {

    try {

        const { userId } = auth();
        const body = await reg.json();

        const { name } = body

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!name) {
            return new NextResponse("Name is Required", { status: 400 });
        }

        if (!params.storeId) {
            return new NextResponse("Store  is Required", { status: 400 });
        }

        const store = await db.store.updateMany({
            where: {
                id: params.storeId,
                userId
            },
            data: {
                name
            }
        });

        return NextResponse.json(store);

    } catch (error) {
        console.log("[STORES_PATCH]", error);
        return new NextResponse("Interal Error", { status: 500 })



    }

}


    export async function DELETE(reg: Request, { params }: { params: { storeId: string } }) {

        try {
    
            const { userId } = auth();
      
    
            if (!userId) {
                return new NextResponse("Unauthorized", { status: 401 });
            }
    
    
            if (!params.storeId) {
                return new NextResponse("Store  is Required", { status: 400 });
            }
    
            const store = await db.store.deleteMany({
                where: {
                    id: params.storeId,
                    userId
                }
            });
    
            return NextResponse.json(store);
    
        } catch (error) {
            console.log("[STORES_DELETE]", error);
            return new NextResponse("Interal Error", { status: 500 })
    
    
    
        }
    



}