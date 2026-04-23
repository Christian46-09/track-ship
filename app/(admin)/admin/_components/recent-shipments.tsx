"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRecentShipments } from "@/hooks/use-recent-shipment";
import { formatDate } from "@/lib/utils";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

export function RecentShipments() {
  const { data: recentShipments, isPending, isError } = useRecentShipments();

  if (isPending) {
    return (
      <Card>
        <div className="p-6">
          <p className="text-sm text-muted-foreground">
            Loading recent shipments...
          </p>
        </div>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card>
        <div className="p-6">
          <p className="text-sm text-muted-foreground">
            Failed to load recent shipments.
          </p>
        </div>
      </Card>
    );
  }
  if (!recentShipments) {
    return (
      <Card>
        <div className="p-6">
          <p className="text-sm text-muted-foreground">
            No recent shipments found.
          </p>
        </div>
      </Card>
    );
  }

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    confirmed: "bg-gray-100 text-gray-800",
    picked_up: "bg-indigo-100 text-indigo-800",
    in_transit: "bg-blue-100 text-blue-800",
    arrived_at_hub: "bg-cyan-100 text-cyan-800",
    out_for_delivery: "bg-purple-100 text-purple-800",
    delivered: "bg-green-100 text-green-800",
    delayed: "bg-orange-100 text-orange-800",
    cancelled: "bg-red-100 text-red-800",
  };

  const statusLabels = {
    pending: "Pending",
    confirmed: "Confirmed",
    picked_up: "Picked Up",
    in_transit: "In Transit",
    arrived_at_hub: "Arrived at Hub",
    out_for_delivery: "Out for Delivery",
    delivered: "Delivered",
    delayed: "Delayed",
    cancelled: "Cancelled",
  };

  return (
    <Card>
      <div className="p-6 border-b border-border flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-foreground">
            Recent Shipments
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Latest 5 shipments
          </p>
        </div>
        <Link href="/admin/shipments">
          <Button variant="outline" className="gap-2">
            View All
            <ArrowRightIcon className="w-4 h-4" />
          </Button>
        </Link>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tracking ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Route</TableHead>
              <TableHead>Weight</TableHead>
              <TableHead>Carrier</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentShipments.map((shipment) => (
              <TableRow key={shipment.id}>
                <TableCell className="font-mono font-semibold text-primary">
                  {shipment.trackingNumber}
                </TableCell>
                <TableCell className="font-medium">
                  {shipment.senderName}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {shipment.origin} → {shipment.destination}
                </TableCell>
                <TableCell className="text-sm">{shipment.weight} kg</TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {shipment.carrier}
                </TableCell>
                <TableCell>
                  <Badge
                    className={
                      statusColors[shipment.status as keyof typeof statusColors]
                    }
                  >
                    {statusLabels[shipment.status as keyof typeof statusLabels]}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {formatDate(shipment.createdAt)}
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">
                    <Link href={`/admin/shipments/${shipment.id}`}>View</Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
