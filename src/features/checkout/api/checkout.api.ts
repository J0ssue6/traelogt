import { supabase } from "@/lib/supabase";

import type { CartItem } from "@/features/cart/types";

export type CheckoutCustomer = {
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  department: string;
  municipality: string;
  address: string;
  notes: string;
};

export type CheckoutResult = {
  id: string;
  order_number: string;
  payment_id: string;
  payment_status: string;
  receipt_upload_token: string;
};

export async function createCustomerOrder(
  customer: CheckoutCustomer,
  items: CartItem[],
): Promise<CheckoutResult> {
  if (items.length === 0) {
    throw new Error("Your cart is empty.");
  }

  const { data, error } = await supabase.rpc("create_customer_order", {
    p_customer_name: customer.customerName,
    p_customer_phone: customer.customerPhone,
    p_customer_email: customer.customerEmail,
    p_department: customer.department,
    p_municipality: customer.municipality,
    p_address: customer.address,
    p_notes: customer.notes,
    p_items: items.map((item) => ({
      variant_id: item.variantId,
      quantity: item.quantity,
    })),
  });

  if (error) {
    throw new Error(
      error.message || "Unable to place your order. Please try again.",
    );
  }

  return data as CheckoutResult;
}
