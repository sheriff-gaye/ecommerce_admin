"use client"

import { Modal } from "@/components/ui/modal";
import { useStoreModal } from "@/hooks/use-store-modal";
import { UserButton } from "@clerk/nextjs";
import { useEffect } from "react";

export default function SetUpPage() {

    const onOpen=useStoreModal((state)=>state.onOpen);
    const isOpen=useStoreModal((state)=>state.isOpen);


    useEffect(()=>{
        if(!isOpen){
            onOpen();
        }

    },[isOpen,onOpen])

  return null;
}
