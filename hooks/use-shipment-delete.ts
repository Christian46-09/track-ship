import { useMutation, useQueryClient } from "@tanstack/react-query";

const queryClient = useQueryClient();

export const deleteMutation = useMutation({
  mutationFn: async (id: string) => {
    const res = await fetch(`/api/admin/shipments/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error("Delete failed");
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["shipments"] });
  },
});
