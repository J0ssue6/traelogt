import { supabase } from "@/lib/supabase";
import type { Order, OrderItem, OrderStatus, OrderWithItems } from "../types";

export async function getOrders(
  search = "",
  status: OrderStatus | "all" = "all",
  page = 1,
) {
  const pageSize = 20;
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from("orders")
    .select(
      `
        *,
        order_items(count)
      `,
      { count: "exact" },
    )
    .order("created_at", { ascending: false })
    .range(from, to);

  if (search.trim()) {
    const value = search.trim();

    query = query.or(
      `order_number.ilike.%${value}%,customer_name.ilike.%${value}%,customer_phone.ilike.%${value}%`,
    );
  }

  if (status !== "all") {
    query = query.eq("status", status);
  }

  const { data, error, count } = await query;

  if (error) {
    throw new Error("Unable to load orders.");
  }

  const orders = (data ?? []).map((order) => ({
    ...order,
    item_count: order.order_items?.[0]?.count ?? 0,
  }));

  return {
    orders: orders as Order[],
    total: count ?? 0,
    page,
    pageSize,
  };
}

export async function getOrder(id: string): Promise<OrderWithItems> {
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .select("*")
    .eq("id", id)
    .single();

  if (orderError) {
    throw new Error("Unable to load order.");
  }

  const { data: items, error: itemsError } = await supabase
    .from("order_items")
    .select("*")
    .eq("order_id", id)
    .order("created_at", { ascending: true });

  if (itemsError) {
    throw new Error("Unable to load order items.");
  }

  /*
   * Payment information is loaded through a secure admin-only RPC.
   *
   * We intentionally do not query order_payments directly because
   * customer/admin payment data is protected by RLS.
   */
  const { data: payment, error: paymentError } = await supabase.rpc(
    "get_admin_payment_details",
    {
      p_order_id: id,
    },
  );

  if (paymentError) {
    throw new Error("Unable to load payment information.");
  }

  return {
    ...(order as Order),
    items: (items ?? []) as OrderItem[],
    payment: payment ?? null,
  };
}

export async function updateOrderStatus(id: string, status: OrderStatus) {
  const { data, error } = await supabase
    .from("orders")
    .update({
      status,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    throw new Error("Unable to update order status.");
  }

  return data as Order;
}

export async function confirmPayment(paymentId: string) {
  const { data, error } = await supabase.rpc("confirm_payment", {
    p_payment_id: paymentId,
  });

  if (error) {
    throw new Error(error.message || "Unable to confirm payment.");
  }

  return data;
}
