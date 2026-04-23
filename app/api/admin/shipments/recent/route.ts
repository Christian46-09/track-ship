import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const recentShipments = await prisma.shipment.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
      select: {
        id: true,
        trackingNumber: true,
        senderName: true,
        receiverName: true,
        origin: true,
        weight: true,
        destination: true,
        status: true,
        carrier: true,
        createdAt: true,
      },
    });

    return NextResponse.json(recentShipments);
  } catch (error) {
    console.error("Recent shipments error:", error);

    return NextResponse.json(
      { message: "Failed to fetch recent shipments" },
      { status: 500 },
    );
  }
}
