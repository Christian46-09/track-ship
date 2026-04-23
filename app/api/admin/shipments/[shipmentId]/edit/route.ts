import { prisma } from "@/lib/prisma";
import {
  UpdateShipmentSchema,
  UpdateShipmentValues,
} from "@/lib/shipment-schema";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: Promise<{ shipmentId: string }>;
  },
) {
  try {
    const { shipmentId } = await params;

    if (!shipmentId) {
      return NextResponse.json(
        { message: "Shipment ID is required" },
        { status: 400 },
      );
    }

    const shipment = await prisma.shipment.findUnique({
      where: {
        id: shipmentId,
      },
      include: {
        history: {
          orderBy: {
            timestamp: "desc",
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
