"use clientnpm "

import { UserButton } from "@clerk/nextjs";

export default function SetUpPage() {
  return (

   <div className="p-4">
    <UserButton afterSignOutUrl="/"/>

   </div>
  )
}
