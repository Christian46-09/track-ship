"use client";

import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { CheckIcon, ClockIcon } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface DeliveryCountdownProps {
  estimatedDeliveryDate: Date | string;
  status: string;
}

export function DeliveryCountdown({
  estimatedDeliveryDate,
  status,
}: DeliveryCountdownProps) {
  const [timeLeft, setTimeLeft] = useState<string>("");
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const target = new Date(estimatedDeliveryDate).getTime();
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setIsExpired(true);
        setTimeLeft("Delivery time has passed");
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);

      setTimeLeft(`${days}d ${hours}h ${minutes}m`);
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 60000);
    return () => clearInterval(interval);
  }, [estimatedDeliveryDate]);

  if (status === "delivered") {
    return (
      <Card className="p-6 bg-green-50 border-green-200">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
            <span className="text-2xl">
              <CheckIcon className="size-4" />
            </span>
          </div>
          <div>
            <p className="text-sm text-green-600 font-medium">Delivered</p>
            <p className="text-lg font-bold text-green-900">
              {formatDate(estimatedDeliveryDate)}
            </p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-linear-to-br from-blue-50 to-blue-100 border-blue-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
            <ClockIcon className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground font-medium">
              Estimated Delivery In
            </p>
            <p className="text-2xl font-bold text-primary">{timeLeft}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground mb-1">Expected by</p>
          <p className="font-semibold text-foreground">
            {new Date(estimatedDeliveryDate).toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>
      </div>
    </Card>
  );
}
