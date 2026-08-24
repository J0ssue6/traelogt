import { useState } from "react";
import { CheckCircle2, ExternalLink, FileText, Loader2 } from "lucide-react";

import { useUpdateOrderStatus } from "../hooks/useUpdateOrderStatus";
import { confirmPayment } from "../api/orders.api";

import {
  formatOrderCurrency,
  ORDER_STATUS_CLASSES,
  ORDER_STATUS_LABELS,
} from "../utils/order-status";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

import type { OrderStatus, OrderWithItems } from "../types";

import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { orderQueryKeys } from "../query-keys";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { supabase } from "@/lib/supabase";

type OrderDetailDialogProps = {
  order: OrderWithItems | null;
  open: boolean;
  isLoading?: boolean;
  isError?: boolean;
  onOpenChange: (open: boolean) => void;
};

function OrderDetailDialog({
  order,
  open,
  isLoading = false,
  isError = false,
  onOpenChange,
}: OrderDetailDialogProps) {
  const updateStatus = useUpdateOrderStatus();
  const queryClient = useQueryClient();

  const [confirmingPayment, setConfirmingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const handleConfirmPayment = async () => {
    if (!order?.payment?.id) return;

    setConfirmingPayment(true);
    setPaymentError(null);

    try {
      await confirmPayment(order.payment.id);

      await queryClient.invalidateQueries({
        queryKey: orderQueryKeys.detail(order.id),
      });

      toast.success("Payment verified", {
        description: `Order ${order.order_number} has been confirmed.`,
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to confirm payment.";

      setPaymentError(message);

      toast.error("Unable to verify payment", {
        description: message,
      });
    } finally {
      setConfirmingPayment(false);
    }
  };

  const handleViewReceipt = async () => {
    const receiptPath = order?.payment?.receipt_path;

    if (!receiptPath) {
      setPaymentError("No payment receipt has been submitted.");
      return;
    }

    setPaymentError(null);

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        setPaymentError(
          "Your admin session has expired. Please sign in again.",
        );
        return;
      }

      const { data, error } = await supabase.storage
        .from("payment-receipts")
        .createSignedUrl(receiptPath, 60 * 10);

      if (error || !data?.signedUrl) {
        setPaymentError(
          error?.message || "Unable to create a secure receipt URL.",
        );
        return;
      }

      window.open(data.signedUrl, "_blank", "noopener,noreferrer");
    } catch (error) {
      setPaymentError(
        error instanceof Error
          ? error.message
          : "Unable to open the payment receipt.",
      );
    }
  };

  const paymentStatusLabel = {
    pending_payment: "Pending payment",
    receipt_submitted: "Receipt submitted",
    confirmed: "Payment confirmed",
    rejected: "Payment rejected",
  }[order?.payment?.status ?? "pending_payment"];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="
          flex
          max-h-[calc(100dvh-2rem)]
          w-[calc(100%-1rem)]
          max-w-[calc(100%-1rem)]
          flex-col
          gap-0
          overflow-hidden
          bg-background
          p-4
          sm:max-h-[90vh]
          sm:w-full
          sm:max-w-2xl
          sm:p-6
        "
      >
        {isLoading && (
          <div className="min-h-0 flex-1 overflow-y-auto pr-1">
            <div className="space-y-6">
              <DialogHeader>
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-4 w-56" />
              </DialogHeader>

              <div className="space-y-3">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-4 w-40" />
              </div>

              <div className="space-y-3">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
              </div>
            </div>
          </div>
        )}

        {isError && (
          <div className="min-h-0 flex-1 overflow-y-auto pr-1">
            <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4 text-sm text-destructive">
              Unable to load this order.
            </div>
          </div>
        )}

        {order && !isLoading && !isError && (
          <>
            <DialogHeader className="shrink-0 pr-6">
              <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <DialogTitle className="min-w-0 break-words">
                  Order {order.order_number}
                </DialogTitle>

                <Select
                  value={order.status}
                  disabled={updateStatus.isPending}
                  onValueChange={(value) => {
                    updateStatus.mutate({
                      id: order.id,
                      status: value as OrderStatus,
                    });
                  }}
                >
                  <SelectTrigger
                    className={`w-full sm:w-40 ${ORDER_STATUS_CLASSES[order.status]}`}
                  >
                    <SelectValue>
                      {ORDER_STATUS_LABELS[order.status]}
                    </SelectValue>
                  </SelectTrigger>

                  <SelectContent className="bg-background">
                    <SelectItem value="pending">
                      {ORDER_STATUS_LABELS.pending}
                    </SelectItem>

                    <SelectItem value="pending_payment">
                      Pending payment
                    </SelectItem>

                    <SelectItem value="confirmed">
                      {ORDER_STATUS_LABELS.confirmed}
                    </SelectItem>

                    <SelectItem value="processing">
                      {ORDER_STATUS_LABELS.processing}
                    </SelectItem>

                    <SelectItem value="shipped">
                      {ORDER_STATUS_LABELS.shipped}
                    </SelectItem>

                    <SelectItem value="delivered">
                      {ORDER_STATUS_LABELS.delivered}
                    </SelectItem>

                    <SelectItem value="cancelled">
                      {ORDER_STATUS_LABELS.cancelled}
                    </SelectItem>
                  </SelectContent>
                </Select>

                {updateStatus.isPending && (
                  <span className="text-xs text-muted-foreground">
                    Saving...
                  </span>
                )}

                {updateStatus.isError && (
                  <p className="text-sm text-destructive">
                    Unable to update the order status. Please try again.
                  </p>
                )}
              </div>

              <DialogDescription>
                Created{" "}
                {order.created_at
                  ? new Date(order.created_at).toLocaleString()
                  : "—"}
              </DialogDescription>
            </DialogHeader>

            {/* Only this area scrolls */}
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain pr-1">
              <div className="space-y-6 pt-4">
                {/* PAYMENT */}
                <section className="rounded-xl border bg-muted/20 p-4 sm:p-5">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <h3 className="font-semibold">Payment</h3>

                      <p className="mt-1 text-sm text-muted-foreground">
                        Bank transfer
                      </p>
                    </div>

                    <div
                      className={`w-fit rounded-full px-3 py-1 text-xs font-medium ${
                        order.payment?.status === "confirmed"
                          ? "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300"
                          : order.payment?.status === "receipt_submitted"
                            ? "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                            : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {paymentStatusLabel}
                    </div>
                  </div>

                  {order.payment ? (
                    <div className="mt-5 space-y-4">
                      <div className="flex flex-wrap justify-between gap-2 text-sm">
                        <span className="text-muted-foreground">Amount</span>

                        <span className="font-semibold">
                          {formatOrderCurrency(order.payment.amount)}
                        </span>
                      </div>

                      <div className="flex flex-wrap justify-between gap-2 text-sm">
                        <span className="text-muted-foreground">Method</span>

                        <span className="font-medium">
                          {order.payment.method === "bank_transfer"
                            ? "Bank transfer"
                            : order.payment.method}
                        </span>
                      </div>

                      {order.payment.submitted_at && (
                        <div className="flex flex-wrap justify-between gap-2 text-sm">
                          <span className="text-muted-foreground">
                            Receipt submitted
                          </span>

                          <span className="font-medium">
                            {new Date(
                              order.payment.submitted_at,
                            ).toLocaleString()}
                          </span>
                        </div>
                      )}

                      {order.payment.verified_at && (
                        <div className="flex flex-wrap justify-between gap-2 text-sm">
                          <span className="text-muted-foreground">
                            Verified
                          </span>

                          <span className="font-medium">
                            {new Date(
                              order.payment.verified_at,
                            ).toLocaleString()}
                          </span>
                        </div>
                      )}

                      {order.payment.receipt_path && (
                        <div className="border-t pt-4">
                          <Button
                            type="button"
                            variant="outline"
                            className="w-full gap-2"
                            onClick={handleViewReceipt}
                          >
                            <FileText className="h-4 w-4 shrink-0" />
                            <span className="truncate">
                              View payment receipt
                            </span>
                            <ExternalLink className="ml-auto h-4 w-4 shrink-0" />
                          </Button>
                        </div>
                      )}

                      {paymentError && (
                        <div className="break-words rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
                          {paymentError}
                        </div>
                      )}

                      {order.payment.status === "receipt_submitted" && (
                        <Button
                          type="button"
                          size="lg"
                          className="w-full gap-2"
                          disabled={confirmingPayment}
                          onClick={handleConfirmPayment}
                        >
                          {confirmingPayment ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" />
                              Confirming payment...
                            </>
                          ) : (
                            <>
                              <CheckCircle2 className="h-4 w-4" />
                              Confirm payment
                            </>
                          )}
                        </Button>
                      )}

                      {order.payment.status === "confirmed" && (
                        <div className="flex items-start gap-2 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-800 dark:border-green-900 dark:bg-green-950/30 dark:text-green-300">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                          <span>Payment has been verified.</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="mt-4 text-sm text-muted-foreground">
                      No payment record is associated with this order.
                    </p>
                  )}
                </section>

                {/* CUSTOMER */}
                <section>
                  <h3 className="mb-3 font-medium">Customer</h3>

                  <div className="space-y-1 text-sm">
                    <p className="break-words">{order.customer_name}</p>

                    <p className="break-words text-muted-foreground">
                      {order.customer_phone}
                    </p>

                    {order.customer_email && (
                      <p className="break-all text-muted-foreground">
                        {order.customer_email}
                      </p>
                    )}
                  </div>
                </section>

                {/* DELIVERY */}
                <section>
                  <h3 className="mb-3 font-medium">Delivery</h3>

                  <div className="space-y-1 text-sm">
                    <p className="break-words">{order.address}</p>

                    <p className="break-words text-muted-foreground">
                      {order.municipality}, {order.department}
                    </p>
                  </div>
                </section>

                {/* ITEMS */}
                <section>
                  <h3 className="mb-3 font-medium">Items</h3>

                  <div className="space-y-3">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex min-w-0 items-start justify-between gap-3 border-b pb-3 last:border-0"
                      >
                        <div className="min-w-0">
                          <p className="break-words font-medium">
                            {item.product_name}
                          </p>

                          <p className="break-words text-sm text-muted-foreground">
                            {item.variant_name}
                            {item.sku ? ` · ${item.sku}` : ""}
                          </p>

                          <p className="text-sm text-muted-foreground">
                            Qty: {item.quantity}
                          </p>
                        </div>

                        <p className="shrink-0 font-medium">
                          {formatOrderCurrency(item.subtotal)}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* TOTAL */}
                <section className="border-t pt-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between gap-4">
                      <span className="text-muted-foreground">Subtotal</span>

                      <span>{formatOrderCurrency(order.subtotal)}</span>
                    </div>

                    <div className="flex justify-between gap-4">
                      <span className="text-muted-foreground">Shipping</span>

                      <span>{formatOrderCurrency(order.shipping)}</span>
                    </div>

                    <div className="flex justify-between gap-4 text-base font-semibold">
                      <span>Total</span>

                      <span>{formatOrderCurrency(order.total)}</span>
                    </div>
                  </div>
                </section>

                {/* NOTES */}
                {order.notes && (
                  <section className="pb-2">
                    <h3 className="mb-2 font-medium">Notes</h3>

                    <p className="break-words rounded-lg bg-muted/50 p-3 text-sm">
                      {order.notes}
                    </p>
                  </section>
                )}
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default OrderDetailDialog;
