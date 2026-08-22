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
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <Card key={item.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium">
                {item.title}
              </CardTitle>

              <Icon className="size-4 text-muted-foreground" />
            </CardHeader>

            <CardContent>
              <div className="text-2xl font-bold">
                {isLoading ? <Skeleton className="h-8 w-16" /> : item.value}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

export default DashboardStats;
