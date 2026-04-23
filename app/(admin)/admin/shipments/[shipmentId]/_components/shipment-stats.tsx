"use client";

import {
  CheckCircleIcon,
  ClockIcon,
  PackageIcon,
  TruckIcon,
} from "lucide-react";
import { StatsCard } from "./stats-card";
import { useShipmentStats } from "@/hooks/use-shipment-stats";

export function ShipmentStats() {
  const { data: stats, isPending, isError } = useShipmentStats();

  if (!stats) {
    return <>No Stats Available</>;
  }
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatsCard
        label="Total Shipments"
        value={stats.total.toLocaleString()}
        change={12}
        icon={<PackageIcon className="w-8 h-8" />}
      />
      <StatsCard
        label="In Transit"
        value={stats.inTransit.toLocaleString()}
        change={5}
        icon={<TruckIcon className="w-8 h-8" />}
      />
      <StatsCard
        label="Delivered"
        value={stats.delivered.toLocaleString()}
        change={18}
        icon={<CheckCircleIcon className="w-8 h-8" />}
      />
      <StatsCard
        label="Pending"
        value={stats.pending.toLocaleString()}
        change={-3}
        icon={<ClockIcon className="w-8 h-8" />}
      />
    </div>
  );
}
