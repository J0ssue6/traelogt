import { supabase } from "@/lib/supabase";
import type {
  DashboardOrder,
  DashboardProduct,
  DashboardStats,
} from "../types";

export async function getDashboardStats(): Promise<DashboardStats> {
  const [productsResult, activeProductsResult, categoriesResult, ordersResult] =
    await Promise.all([
      supabase.from("products").select("id", { count: "exact", head: true }),

      supabase
        .from("products")
        .select("id", { count: "exact", head: true })
        .eq("active", true),

      supabase.from("categories").select("id", { count: "exact", head: true }),

      supabase.from("orders").select("id", { count: "exact", head: true }),
    ]);

  const error =
    productsResult.error ??
    activeProductsResult.error ??
    categoriesResult.error ??
    ordersResult.error;

  if (error) {
    throw new Error("Unable to load dashboard statistics.");
  }

  return {
    totalProducts: productsResult.count ?? 0,
    activeProducts: activeProductsResult.count ?? 0,
    totalCategories: categoriesResult.count ?? 0,
    totalOrders: ordersResult.count ?? 0,
  };
}

export async function getRecentProducts(): Promise<DashboardProduct[]> {
  const { data, error } = await supabase
    .from("products")
    .select("id, name, slug, active, created_at")
    .order("created_at", { ascending: false })
    .limit(5);

  if (error) {
    throw new Error("Unable to load recent products.");
  }

  return data as DashboardProduct[];
}

export async function getRecentOrders(): Promise<DashboardOrder[]> {
  const { data, error } = await supabase
    .from("orders")
    .select("id, status, total, created_at")
    .order("created_at", { ascending: false })
    .limit(5);

  if (error) {
    throw new Error("Unable to load recent orders.");
  }

  return data as DashboardOrder[];
}
