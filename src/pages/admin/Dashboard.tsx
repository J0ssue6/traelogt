import { useRecentOrders } from "@/features/dashboard/hooks/useRecentOrders";
import { useRecentProducts } from "@/features/dashboard/hooks/useRecentProducts";
import { useDashboardStats } from "@/features/dashboard/hooks/useDashboardStats";
import DashboardStats from "@/features/dashboard/components/DashboardStats";
import RecentProducts from "@/features/dashboard/components/RecentProducts";
import RecentOrders from "@/features/dashboard/components/RecentOrders";

function Dashboard() {
  const { data, isLoading, isError } = useDashboardStats();
  const recentProducts = useRecentProducts();
  const recentOrders = useRecentOrders();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>

        <p className="text-muted-foreground">Overview of your store.</p>
      </div>

      {isError ? (
        <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4 text-sm text-destructive">
          Unable to load dashboard statistics.
        </div>
      ) : (
        <DashboardStats stats={data} isLoading={isLoading} />
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          {recentProducts.isLoading && (
            <div className="text-sm text-muted-foreground">
              Loading recent products...
            </div>
          )}

          {recentProducts.isError && (
            <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4 text-sm text-destructive">
              Unable to load recent products.
            </div>
          )}

          {recentProducts.data && (
            <RecentProducts products={recentProducts.data} />
          )}
        </div>

        <div>
          {recentOrders.isLoading && (
            <div className="text-sm text-muted-foreground">
              Loading recent orders...
            </div>
          )}

          {recentOrders.isError && (
            <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4 text-sm text-destructive">
              Unable to load recent orders.
            </div>
          )}

          {recentOrders.data && <RecentOrders orders={recentOrders.data} />}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
