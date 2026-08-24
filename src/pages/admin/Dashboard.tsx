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
    <div className="w-full min-w-0 space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-xl font-bold sm:text-2xl">Dashboard</h1>

        <p className="text-sm text-muted-foreground sm:text-base">
          Overview of your store.
        </p>
      </div>

      {isError ? (
        <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-3 text-sm text-destructive sm:p-4">
          Unable to load dashboard statistics.
        </div>
      ) : (
        <DashboardStats stats={data} isLoading={isLoading} />
      )}

      <div className="grid min-w-0 gap-4 lg:grid-cols-2 lg:gap-6">
        <div className="min-w-0">
          {recentProducts.isLoading && (
            <div className="text-sm text-muted-foreground">
              Loading recent products...
            </div>
          )}

          {recentProducts.isError && (
            <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-3 text-sm text-destructive sm:p-4">
              Unable to load recent products.
            </div>
          )}

          {recentProducts.data && (
            <RecentProducts products={recentProducts.data} />
          )}
        </div>

        <div className="min-w-0">
          {recentOrders.isLoading && (
            <div className="text-sm text-muted-foreground">
              Loading recent orders...
            </div>
          )}

          {recentOrders.isError && (
            <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-3 text-sm text-destructive sm:p-4">
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
