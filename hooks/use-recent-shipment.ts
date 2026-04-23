import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/lib/fetcher";

export type RecentShipment = {
  id: string;
  trackingNumber: string;
  senderName: string;
  receiverName: string;
  weight: number;
  origin: string;
  destination: string;
  status: string;
  carrier: string;
  createdAt: string;
};

export function useRecentShipments() {
  return useQuery({
    queryKey: ["recent-shipments"],
    queryFn: () => fetcher<RecentShipment[]>("/api/admin/shipments/recent"),
    staleTime: 30 * 1000,
  });
}
