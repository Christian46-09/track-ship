import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/lib/fetcher";

export type Shipment = {
  id: string;
  trackingNumber: string;
  senderName: string;
  receiverName: string;
  origin: string;
  destination: string;
  weight: number;
  cost: number;
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

export function useShipments() {
  return useQuery({
    queryKey: ["shipments"],
    queryFn: () => fetcher<Shipment[]>("/api/admin/shipments"),
  });
}
