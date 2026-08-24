import { Link } from "react-router-dom";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import type { DashboardOrder } from "../types";

type RecentOrdersProps = {
  orders: DashboardOrder[];
};

function RecentOrders({ orders }: RecentOrdersProps) {
  return (
    <Card className="min-w-0 overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between gap-3">
        <CardTitle className="truncate">Recent orders</CardTitle>

        <Link
          to="/admin/orders"
          className="shrink-0 rounded-md px-2 py-1.5 text-sm font-medium transition-colors hover:bg-muted sm:px-3"
        >
          View all
        </Link>
      </CardHeader>

      <CardContent className="min-w-0">
        {orders.length === 0 ? (
          <p className="text-sm text-muted-foreground">No orders yet.</p>
        ) : (
          <>
            {/* Desktop */}
            <div className="hidden overflow-x-auto sm:block">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left">
                    <th className="px-2 py-3 font-medium">Order</th>
                    <th className="px-2 py-3 font-medium">Status</th>
                    <th className="px-2 py-3 font-medium">Total</th>
                    <th className="px-2 py-3 font-medium">Date</th>
                  </tr>
                </thead>

                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b last:border-0">
                      <td className="px-2 py-3 font-medium">
                        #{order.id.slice(0, 8)}
                      </td>

                      <td className="px-2 py-3">
                        <Badge variant="secondary">{order.status}</Badge>
                      </td>

                      <td className="px-2 py-3">Q{order.total}</td>

                      <td className="px-2 py-3 text-muted-foreground">
                        {new Date(order.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile */}
            <div className="space-y-3 sm:hidden">
              {orders.map((order) => (
                <div key={order.id} className="rounded-lg border p-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">
                        #{order.id.slice(0, 8)}
                      </p>

                      <p className="mt-1 text-xs text-muted-foreground">
                        {new Date(order.created_at).toLocaleDateString()}
                      </p>
                    </div>

                    <Badge variant="secondary" className="shrink-0">
                      {order.status}
                    </Badge>
                  </div>

                  <div className="mt-3 flex items-center justify-between border-t pt-3">
                    <span className="text-xs text-muted-foreground">Total</span>

                    <span className="text-sm font-semibold">
                      Q{order.total}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default RecentOrders;
