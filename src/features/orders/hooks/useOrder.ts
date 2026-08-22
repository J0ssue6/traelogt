import { useQuery } from "@tanstack/react-query";
import { getOrder } from "../api/orders.api";
import { orderQueryKeys } from "../query-keys";

export function useOrder(id: string | null) {
  return useQuery({
    queryKey: id ? orderQueryKeys.detail(id) : ["orders", "detail", "empty"],

    queryFn: () => {
      if (!id) {
        throw new Error("Order ID is required.");
      }

      return getOrder(id);
    },

    enabled: Boolean(id),
  });
}
