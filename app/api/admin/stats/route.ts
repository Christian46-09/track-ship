import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [total, inTransit, delivered, pending] = await Promise.all([
      prisma.shipment.count(),
      prisma.shipment.count({ where: { status: "in_transit" } }),
      prisma.shipment.count({ where: { status: "delivered" } }),
      prisma.shipment.count({ where: { status: "pending" } }),
    ]);

    return NextResponse.json({
      total,
      inTransit,
      delivered,
      pending,
    });
  } catch (error) {
    console.error("Stats error:", error);

    return NextResponse.json(
      { message: "Failed to fetch stats" },
      { status: 500 },
    );
  }
}
