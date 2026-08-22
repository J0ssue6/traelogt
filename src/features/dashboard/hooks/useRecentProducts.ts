import { useQuery } from "@tanstack/react-query";
import { getRecentProducts } from "../api/dashboard.api";
import { dashboardQueryKeys } from "../query-keys";

export function useRecentProducts() {
  return useQuery({
    queryKey: dashboardQueryKeys.recentProducts(),
    queryFn: getRecentProducts,
  });
}
