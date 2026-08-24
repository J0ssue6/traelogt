import { Package, ShoppingCart, Tags, CheckCircle2 } from "lucide-react";
import type { DashboardStats as DashboardStatsType } from "../types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

type DashboardStatsProps = {
  stats?: DashboardStatsType;
  isLoading?: boolean;
};

function DashboardStats({ stats, isLoading = false }: DashboardStatsProps) {
  const items = [
    {
      title: "Total products",
      value: stats?.totalProducts ?? 0,
      icon: Package,
    },
    {
      title: "Active products",
      value: stats?.activeProducts ?? 0,
      icon: CheckCircle2,
    },
    {
      title: "Categories",
      value: stats?.totalCategories ?? 0,
      icon: Tags,
    },
    {
      title: "Orders",
      value: stats?.totalOrders ?? 0,
      icon: ShoppingCart,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <Card key={item.title} className="min-w-0">
            <CardHeader className="flex min-w-0 flex-row items-center justify-between space-y-0 p-4 sm:p-6">
              <CardTitle className="truncate text-xs font-medium sm:text-sm">
                {item.title}
              </CardTitle>

              <Icon className="ml-2 size-4 shrink-0 text-muted-foreground" />
            </CardHeader>

            <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0">
              <div className="text-xl font-bold sm:text-2xl">
                {isLoading ? (
                  <Skeleton className="h-7 w-14 sm:h-8 sm:w-16" />
                ) : (
                  item.value
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

export default DashboardStats;
