import { AdminShipment } from "./_components/admin-shipment";

export default async function ShipmentDetailPage({
  params,
}: {
  params: Promise<{ shipmentId: string }>;
}) {
  const { shipmentId } = await params;

  return (
    <div>
      <AdminShipment shipmentId={shipmentId} />
    </div>
  );
}
