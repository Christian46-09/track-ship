import AdminShipments from "./_components/admin-shipments";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ShipmentsPage() {
  return (
    <div className="flex flex-col h-full">
      <AdminShipments />
    </div>
  );
}
