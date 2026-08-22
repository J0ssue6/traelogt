import { useQuery } from "@tanstack/react-query";
import { getOrders } from "../api/orders.api";
import { orderQueryKeys } from "../query-keys";
import type { OrderStatus } from "../types";

export function useOrders(
  search = "",
  status: OrderStatus | "all" = "all",
  page = 1,
) {
  return useQuery({
    queryKey: orderQueryKeys.list(search, status, page),
    queryFn: () => getOrders(search, status, page),
  });
}
