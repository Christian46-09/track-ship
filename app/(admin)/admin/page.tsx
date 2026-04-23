import { Card } from "@/components/ui/card";

import { TrendingUpIcon, AlertCircleIcon } from "lucide-react";
import { AdminHeader } from "./_components/admin-header";

import { ShipmentStats } from "./shipments/[shipmentId]/_components/shipment-stats";
import { RecentShipments } from "./_components/recent-shipments";

export default async function Dashboard() {
  return (
    <div className="flex flex-col h-full">
      <AdminHeader
        title="Dashboard"
        description="Monitor shipments, analytics, and logistics operations"
      />

      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        {/* Stats Grid */}
        <ShipmentStats />

        {/* Quick Insights & Alerts */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Key Metrics */}
          <Card className="lg:col-span-2">
            <div className="p-6 border-b border-border">
              <div className="flex items-center gap-2">
                <TrendingUpIcon className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-bold text-foreground">
                  Performance Metrics
                </h3>
              </div>
            </div>
            <div className="p-6 grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  On-Time Delivery Rate
                </p>
                <p className="text-2xl font-bold text-foreground">98.2%</p>
                <p className="text-xs text-green-600">↑ 1.2% from last month</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Avg. Delivery Time
                </p>
                <p className="text-2xl font-bold text-foreground">2.4 days</p>
                <p className="text-xs text-green-600">↓ 0.3 days improvement</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold text-foreground">$184,200</p>
                <p className="text-xs text-green-600">↑ 24% from last month</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Active Customers
                </p>
                <p className="text-2xl font-bold text-foreground">428</p>
                <p className="text-xs text-green-600">↑ 45 new customers</p>
              </div>
            </div>
          </Card>

          {/* Alerts */}
          <Card>
            <div className="p-6 border-b border-border">
              <div className="flex items-center gap-2">
                <AlertCircleIcon className="w-5 h-5 text-orange-500" />
                <h3 className="text-lg font-bold text-foreground">Alerts</h3>
              </div>
            </div>
            <div className="p-6 space-y-3">
              <div className="p-3 rounded-lg bg-orange-50 border border-orange-200">
                <p className="text-sm font-medium text-orange-900">
                  Delayed Shipments
                </p>
                <p className="text-xs text-orange-700 mt-1">
                  3 shipments delayed by 2+ hours
                </p>
              </div>
              <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                <p className="text-sm font-medium text-blue-900">
                  New Customers
                </p>
                <p className="text-xs text-blue-700 mt-1">
                  12 new sign-ups today
                </p>
              </div>
              <div className="p-3 rounded-lg bg-green-50 border border-green-200">
                <p className="text-sm font-medium text-green-900">
                  Maintenance
                </p>
                <p className="text-xs text-green-700 mt-1">
                  All systems operational
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Shipments Table */}
        <RecentShipments />
      </div>
    </div>
  );
}
