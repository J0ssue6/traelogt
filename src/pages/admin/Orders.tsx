import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { OrderStatus } from "@/features/orders/types";
import { useOrders } from "@/features/orders/hooks/useOrders";
import { useOrder } from "@/features/orders/hooks/useOrder";

import OrdersTable from "@/features/orders/components/OrdersTable";
import OrdersPagination from "@/features/orders/components/OrdersPagination";
import OrderDetailDialog from "@/features/orders/components/OrderDetailDialog";
import OrdersTableSkeleton from "@/features/orders/components/OrdersTableSkeleton";

import { useDebouncedValue } from "@/hooks/useDebouncedValue";

function Orders() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<OrderStatus | "all">("all");
  const [page, setPage] = useState(1);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const debouncedSearch = useDebouncedValue(search);

  const orders = useOrders(debouncedSearch, status, page);
  const selectedOrder = useOrder(selectedOrderId);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Orders</h1>

        <p className="text-muted-foreground">
          Manage customer orders and fulfillment.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Input
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
            setPage(1);
          }}
          placeholder="Search by order number, customer, or phone..."
          className="sm:max-w-md"
        />

        <Select
          value={status}
          onValueChange={(value) => {
            setStatus(value as OrderStatus | "all");
            setPage(1);
          }}
        >
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>

          <SelectContent className="max-h-[90vh] overflow-y-auto bg-background sm:max-w-2xl">
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="shipped">Shipped</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {orders.isLoading && <OrdersTableSkeleton />}

      {orders.isError && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-6">
          <h3 className="font-medium">Unable to load orders</h3>

          <p className="mt-1 text-sm text-muted-foreground">
            Something went wrong while loading your orders.
          </p>

          <Button
            variant="outline"
            className="mt-4"
            onClick={() => orders.refetch()}
          >
            Try again
          </Button>
        </div>
      )}

      {orders.isSuccess && (
        <>
          {orders.data.orders.length === 0 ? (
            <div className="rounded-xl border border-dashed p-12 text-center">
              <h3 className="text-lg font-semibold">No orders found</h3>

              <p className="mt-2 text-sm text-muted-foreground">
                Orders created by customers will appear here.
              </p>
            </div>
          ) : (
            <>
              <OrdersTable
                orders={orders.data.orders}
                onSelect={(order) => {
                  setSelectedOrderId(order.id);
                }}
              />

              <OrdersPagination
                page={orders.data.page}
                pageSize={orders.data.pageSize}
                total={orders.data.total}
                onPageChange={setPage}
              />
            </>
          )}
        </>
      )}

      <OrderDetailDialog
        order={selectedOrder.data ?? null}
        open={Boolean(selectedOrderId)}
        isLoading={selectedOrder.isLoading}
        isError={selectedOrder.isError}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedOrderId(null);
          }
        }}
      />
    </div>
  );
}

export default Orders;
