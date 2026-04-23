// hooks/use-shipment-stats.ts
import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/lib/fetcher";

export type ShipmentStats = {
  total: number;
  inTransit: number;
  delivered: number;
  pending: number;
};

export function useShipmentStats() {
  return useQuery({
    queryKey: ["shipment-stats"],
    queryFn: () => fetcher<ShipmentStats>("/api/admin/stats"),
    staleTime: 30 * 1000, // 30s cache
  });
}
