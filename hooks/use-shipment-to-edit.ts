import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/lib/fetcher";

export type Shipment = {
  id: string;
  trackingNumber: string;
  senderName: string;
  senderAddress: string;
  senderPhone: string;
  receiverName: string;
  receiverAddress: string;
  receiverPhone: string;
  serviceType: "standard" | "express" | "economy" | "premium";
  origin: string;
  destination: string;
  weight: number;
  cost: number;
  description: string;
  actualDeliveryDate: string;
  currentLocation: string;
  estimatedDeliveryDate: string;
  carrier: "DHL" | "UPS" | "FedEx";
  status:
    | "pending"
    | "confirmed"
    | "picked_up"
    | "in_transit"
    | "arrived_at_hub"
    | "out_for_delivery"
    | "delivered"
    | "delayed"
    | "cancelled";
  createdAt: string;
};

export function useShipmentToEdit(shipmentId: string) {
  return useQuery({
    queryKey: ["shipment", shipmentId],
    queryFn: () => fetcher<Shipment>(`/api/admin/shipments/${shipmentId}/edit`),
    enabled: !!shipmentId,
  });
}
