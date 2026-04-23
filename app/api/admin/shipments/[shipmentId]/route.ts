import { prisma } from "@/lib/prisma";
import { UpdateShipmentSchema } from "@/lib/shipment-schema";
import { NextResponse } from "next/server";

export async function DELETE(
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
      return new NextResponse("Shipment ID is required", { status: 400 });
    }

    await prisma.shipment.delete({
      where: {
        id: shipmentId,
      },
    });
    return NextResponse.json(
      { message: "Shipment deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    return new NextResponse("An error occurred while deleting the shipment", {
      status: 500,
    });
  }
}

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

export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: Promise<{ shipmentId: string }>;
  },
) {
  try {
    const { shipmentId } = await params;

    const body = await req.json();

    const validatedData = UpdateShipmentSchema.safeParse(body);

    if (!validatedData.success) {
      return NextResponse.json(
        {
          message: "Invalid shipment data",
          errors: validatedData.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const {
      senderName,
      senderAddress,
      senderPhone,
      receiverName,
      receiverAddress,
      receiverPhone,
      origin,
      destination,
      currentLocation,
      weight,
      carrier,
      cost,
      serviceType,
      description,
      status,
      estimatedDeliveryDate,
      actualDeliveryDate,
    } = validatedData.data;

    const shipment = await prisma.shipment.update({
      where: { id: shipmentId },
      data: {
        senderName,
        senderAddress,
        senderPhone,
        receiverName,
        receiverAddress,
        receiverPhone,
        origin,
        destination,
        currentLocation: currentLocation || destination,
        weight,
        cost,
        serviceType,
        carrier,
        description: description || null,
        status,
        estimatedDeliveryDate: new Date(estimatedDeliveryDate),
        actualDeliveryDate: actualDeliveryDate
          ? new Date(actualDeliveryDate)
          : null,

        history: {
          create: {
            status,
            title: "Shipment Updated",
            description: `Shipment status changed to ${status}`,
            location: currentLocation || destination,
            completed: true,
          },
        },
      },
    });

    return NextResponse.json(
      { message: "Shipment updated", data: shipment },
      { status: 200 },
    );
  } catch (error) {
    console.error("Update shipment error:", error);
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Failed to update shipment",
      },
      { status: 500 },
    );
  }
}
