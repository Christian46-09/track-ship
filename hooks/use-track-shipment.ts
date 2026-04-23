import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/lib/fetcher";

export type ShipmentHistory = {
  id: string;
  status: string;
  title: string;
  description: string;
  location: string;
  notes?: string;
  timestamp: string;
  completed: boolean;
};

export type Shipment = {
  id: string;
  trackingNumber: string;
  senderName: string;
  senderAddress: string;
  senderPhone: string;
  receiverName: string;
  receiverAddress: string;
  receiverPhone: string;
  origin: string;
  destination: string;
  weight: number;
  description: string;
  actualDeliveryDate: string;
  currentLocation: string;
  estimatedDeliveryDate: string;
  cost: number;
  serviceType: "standard" | "express" | "economy" | "premium";
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

  history?: ShipmentHistory[];
};

export function useTrackShipment(trackId: string) {
  return useQuery({
    queryKey: ["shipment", trackId],
    queryFn: () => fetcher<Shipment>(`/api/admin/shipments/track/${trackId}`),
  });
}
