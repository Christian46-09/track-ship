import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const shipments = await prisma.shipment.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      trackingNumber: true,
      senderName: true,
      receiverName: true,
      origin: true,
      destination: true,
      weight: true,
      cost: true,
      carrier: true,
      status: true,
      createdAt: true,
    },
  });

  return NextResponse.json(shipments);
}
