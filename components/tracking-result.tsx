"use client";

import { motion } from "motion/react";
import { Timeline } from "./timeline";
import { TrackingCard } from "./tracking-card";

export const TrackingResult = () => {
  const trackingData = {
    trackingId: "TS-YHSIDGSM",
    status: "in_transit" as const,
    sender: "Acme Industries",
    receiver: "Tech Solutions Inc.",
    origin: "Los Angeles, CA",
    destination: "New York, NY",
    deliveryDate: "28 March 2024",
  };

  const timelineEvents = [
    {
      id: "1",
      title: "Package Picked Up",
      description: "Your shipment has been collected from the sender location.",
      location: "Los Angeles, CA",
      timestamp: "2024-03-24T09:30:00",
      completed: true,
    },
    {
      id: "2",
      title: "In Transit",
      description: "Your package is on the way to the distribution center.",
      location: "Phoenix Distribution Hub",
      timestamp: "2024-03-25T14:15:00",
      completed: true,
    },
    {
      id: "3",
      title: "At Distribution Center",
      description: "Package received at our distribution facility.",
      location: "Dallas, TX",
      timestamp: "2024-03-26T08:45:00",
      completed: true,
    },
    {
      id: "4",
      title: "Out for Delivery",
      description: "Your package is on the delivery truck.",
      location: "New York, NY",
      timestamp: "2024-03-27T06:30:00",
      completed: false,
    },
    {
      id: "5",
      title: "Delivered",
      description: "Package successfully delivered.",
      location: "New York, NY",
      timestamp: "2024-03-28T00:00:00",
      completed: false,
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-secondary/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Track Your Shipment
          </h2>
          <p className="text-muted-foreground">
            Real-time updates on your package with detailed location history
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-1"
          >
            <TrackingCard {...trackingData} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-2"
          >
            <Timeline events={timelineEvents} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
