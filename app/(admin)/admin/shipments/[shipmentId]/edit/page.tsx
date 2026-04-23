import { AdminUpdateShipmentForm } from "./_components/admin-shipment-update-form";

export default async function EditShipmentPage({
  params,
}: {
  params: Promise<{ shipmentId: string }>;
}) {
  const { shipmentId } = await params;

  return (
    <div className="flex flex-col h-full">
      <AdminUpdateShipmentForm shipmentId={shipmentId} />
    </div>
  );
}
