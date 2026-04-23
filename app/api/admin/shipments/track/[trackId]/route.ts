import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: Promise<{ trackId: string }>;
  },
) {
  try {
    const { trackId } = await params;

    if (!trackId) {
      return NextResponse.json(
        { message: "Track ID is required" },
        { status: 400 },
      );
    }

    const shipment = await prisma.shipment.findUnique({
      where: { trackingNumber: trackId },
      include: {
        history: {
          orderBy: {
            timestamp: "asc",
          },
        },
      },
    });

    if (!shipment) {
      return NextResponse.json(
        { message: "Shipment not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(shipment, { status: 200 });
  } catch (error) {
    console.error("Fetch shipment error:", error);

    return NextResponse.json(
      { message: "An error occurred while fetching the shipment" },
      { status: 500 },
    );
  }
}
