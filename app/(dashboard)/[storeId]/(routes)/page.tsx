import db from "@/lib/prismadb";

interface DashbaordPageProps {
  params: { storeId: string };
}

const DashboardPage: React.FC<DashbaordPageProps> = async ({ params }) => {
  const store = await db.store.findFirst({
    where: {
      id: params.storeId
    }
  });

  return <div>Active Store {store?.name}</div>;
};

export default DashboardPage;
