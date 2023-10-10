import db from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function DashbaordLayout({
    children,
  params
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  const { userId } = auth();

  if (!userId) {
    return redirect("/sign-in");
  }

  const store = await db.store.findFirst({
    where: {
      id: params.storeId,
      userId
    }
  });

  if (!store) {
    return redirect("/");
  }

  return (
    <>
      <div>this will be a nav bar</div>
    </>
  );
}
