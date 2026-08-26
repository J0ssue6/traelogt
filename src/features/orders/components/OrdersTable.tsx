import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/guatemala";

import type { Order } from "../types";
import {
  ORDER_STATUS_CLASSES,
  ORDER_STATUS_LABELS,
} from "../utils/order-status";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type OrdersTableProps = {
  orders: Order[];
  onSelect: (order: Order) => void;
};

function OrdersTable({ orders, onSelect }: OrdersTableProps) {
  return (
    <div className="min-w-0">
      {/* Desktop */}
      <div className="hidden overflow-x-auto rounded-xl border sm:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Shipping</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {orders.map((order) => (
              <TableRow
                key={order.id}
                className="cursor-pointer"
                onClick={() => onSelect(order)}
              >
                <TableCell className="font-medium">
                  {order.order_number}
                </TableCell>

                <TableCell>
                  <div>
                    <p className="font-medium">{order.customer_name}</p>

                    <p className="text-xs text-muted-foreground">
                      {order.customer_phone}
                    </p>
                  </div>
                </TableCell>

                <TableCell>{order.item_count ?? 0}</TableCell>

                <TableCell>
                  <div>
                    <p>{order.municipality}</p>

                    <p className="text-xs text-muted-foreground">
                      {order.department}
                    </p>
                  </div>
                </TableCell>

                <TableCell>
                  {order.shipping != null
                    ? formatCurrency(Number(order.shipping))
                    : "—"}
                </TableCell>

                <TableCell className="font-medium">
                  {formatCurrency(Number(order.total))}
                </TableCell>

                <TableCell>
                  <Badge
                    variant="secondary"
                    className={ORDER_STATUS_CLASSES[order.status]}
                  >
                    {ORDER_STATUS_LABELS[order.status]}
                  </Badge>
                </TableCell>

                <TableCell className="text-muted-foreground">
                  {order.created_at
                    ? new Date(order.created_at).toLocaleDateString()
                    : "—"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile */}
      <div className="space-y-3 sm:hidden">
        {orders.map((order) => (
          <button
            key={order.id}
            type="button"
            onClick={() => onSelect(order)}
            className="w-full rounded-xl border bg-background p-4 text-left transition-colors hover:bg-muted/50 active:bg-muted"
          >
            <div className="flex min-w-0 items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate font-semibold">{order.order_number}</p>

                <p className="mt-1 truncate text-sm">{order.customer_name}</p>

                <p className="truncate text-xs text-muted-foreground">
                  {order.customer_phone}
                </p>
              </div>

              <Badge
                variant="secondary"
                className={`shrink-0 ${ORDER_STATUS_CLASSES[order.status]}`}
              >
                {ORDER_STATUS_LABELS[order.status]}
              </Badge>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 border-t pt-3">
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">Items</p>

                <p className="mt-0.5 font-medium">{order.item_count ?? 0}</p>
              </div>

              <div className="min-w-0 text-right">
                <p className="text-xs text-muted-foreground">Total</p>

                <p className="mt-0.5 font-semibold">
                  {formatCurrency(Number(order.total))}
                </p>
              </div>

              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">Shipping</p>

                <p className="mt-0.5 font-medium">
                  {order.shipping != null
                    ? formatCurrency(Number(order.shipping))
                    : "—"}
                </p>
              </div>

              <div className="min-w-0 text-right">
                <p className="text-xs text-muted-foreground">Location</p>

                <p className="mt-0.5 truncate">{order.municipality}</p>

                <p className="truncate text-xs text-muted-foreground">
                  {order.department}
                </p>
              </div>

              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">Date</p>

                <p className="mt-0.5 text-sm text-muted-foreground">
                  {order.created_at
                    ? new Date(order.created_at).toLocaleDateString()
                    : "—"}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default OrdersTable;
