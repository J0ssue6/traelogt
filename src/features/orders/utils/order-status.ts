import type { OrderStatus } from "../types";

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  processing: "Processing",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

export const ORDER_STATUS_CLASSES: Record<OrderStatus, string> = {
  pending:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",

  confirmed: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",

  processing:
    "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",

  shipped:
    "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300",

  delivered:
    "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",

  cancelled: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
};

export function formatOrderCurrency(value: number | null | undefined) {
  return `Q${Number(value ?? 0).toFixed(2)}`;
}
