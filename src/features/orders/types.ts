export type OrderStatus =
  | "pending"
  | "pending_payment"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export type Order = {
  id: string;
  order_number: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string | null;
  department: string;
  municipality: string;
  address: string;
  notes: string | null;
  status: OrderStatus;
  subtotal: number;
  shipping: number | null;
  total: number;
  created_at: string | null;
  updated_at: string | null;
  item_count?: number;
};

export type OrderItem = {
  id: string;
  order_id: string;
  product_variant_id: string;
  product_name: string;
  variant_name: string;
  sku: string | null;
  quantity: number;
  unit_price: number;
  subtotal: number;
  created_at: string | null;
};

export type OrderPayment = {
  id: string;
  order_id: string;
  method: string;
  status: string;
  amount: number;
  receipt_path: string | null;
  submitted_at: string | null;
  verified_at: string | null;
  verified_by: string | null;
  admin_notes: string | null;
  created_at: string | null;
  updated_at: string | null;
};

export type OrderWithItems = Order & {
  items: OrderItem[];
  payment: OrderPayment | null;
};
