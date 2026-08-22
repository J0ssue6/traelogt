import { supabase } from "@/lib/supabase";
import type { Product } from "../types";

export async function createProduct(
  values: Pick<Product, "name" | "description" | "category_id">,
) {
  const slug = values.name.trim().toLowerCase().replace(/\s+/g, "-");

  const { data, error } = await supabase
    .from("products")
    .insert({
      name: values.name.trim(),
      description: values.description?.trim() || null,
      category_id: values.category_id,
      slug,
    })
    .select()
    .single();

  if (error) {
    if (error.code === "23505") {
      throw new Error("A product with this name already exists.");
    }

    throw new Error("Unable to create product. Please try again.");
  }

  return data as Product;
}

export async function getProducts(search = "", page = 1, pageSize = 20) {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from("products")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (search.trim()) {
    query = query.ilike("name", `%${search.trim()}%`);
  }

  const { data, error, count } = await query;

  if (error) {
    throw new Error("Unable to load products.");
  }

  return {
    products: data as Product[],
    total: count ?? 0,
  };
}

export async function updateProduct(
  id: string,
  values: Pick<Product, "name" | "description" | "category_id">,
) {
  const slug = values.name.trim().toLowerCase().replace(/\\s+/g, "-");

  const { data, error } = await supabase
    .from("products")
    .update({
      name: values.name.trim(),
      slug,
      description: values.description?.trim() || null,
      category_id: values.category_id,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    if (error.code === "23505") {
      throw new Error("A product with this name already exists.");
    }

    throw new Error("Unable to update product.");
  }

  return data as Product;
}

export async function deleteProduct(id: string) {
  const { data, error } = await supabase
    .from("products")
    .delete()
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error("Unable to delete product.");
  }

  return data as Product;
}
