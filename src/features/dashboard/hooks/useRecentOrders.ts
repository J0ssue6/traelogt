import { useQuery } from "@tanstack/react-query";
import { getRecentOrders } from "../api/dashboard.api";
import { dashboardQueryKeys } from "../query-keys";

export function useRecentOrders() {
  return useQuery({
    queryKey: dashboardQueryKeys.recentOrders(),
    queryFn: getRecentOrders,
  });
}
