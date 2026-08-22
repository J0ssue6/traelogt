import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateOrderStatus } from "../api/orders.api";
import { orderQueryKeys } from "../query-keys";
import type { OrderStatus, OrderWithItems } from "../types";

export function useUpdateOrderStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: OrderStatus }) =>
      updateOrderStatus(id, status),

    onSuccess: (updatedOrder) => {
      queryClient.invalidateQueries({
        queryKey: orderQueryKeys.all,
      });

      queryClient.setQueryData<OrderWithItems>(
        orderQueryKeys.detail(updatedOrder.id),
        (current) =>
          current
            ? {
                ...current,
                status: updatedOrder.status,
                updated_at: updatedOrder.updated_at,
              }
            : current,
      );
    },
  });
}
