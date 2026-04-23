import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UpdateShipmentValues } from "@/lib/shipment-schema";

type UpdateShipmentResponse = {
  message: string;
  data: {
    id: string;
    trackingNumber: string;
  };
};

export function useUpdateShipment(shipmentId: string) {
  const queryClient = useQueryClient();

  return useMutation<UpdateShipmentResponse, Error, UpdateShipmentValues>({
    mutationFn: async (values: UpdateShipmentValues) => {
      const res = await fetch(`/api/admin/shipments/${shipmentId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const text = await res.text();
      console.log("PATCH status:", res.status);
      console.log("PATCH raw response:", text);

      let data = null;
      try {
        data = text ? JSON.parse(text) : null;
      } catch {
        throw new Error("Server returned an invalid response");
      }

      if (!res.ok) {
        throw new Error(
          `Update failed (${res.status}): ${data?.message || "Unknown error"}`,
        );
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shipments"] });
      queryClient.invalidateQueries({ queryKey: ["shipment", shipmentId] });
    },
  });
}
