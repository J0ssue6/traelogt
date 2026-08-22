import { useQuery } from "@tanstack/react-query";
import { getDashboardStats } from "../api/dashboard.api";
import { dashboardQueryKeys } from "../query-keys";

export function useDashboardStats() {
  return useQuery({
    queryKey: dashboardQueryKeys.stats(),
    queryFn: getDashboardStats,
  });
}
