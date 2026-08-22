import { Badge } from "@/components/ui/badge";
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
    <div className="overflow-x-auto rounded-xl border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Location</TableHead>
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

              <TableCell className="font-medium">Q{order.total}</TableCell>

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
  );
}

export default OrdersTable;
