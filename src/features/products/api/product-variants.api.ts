import { supabase } from "@/lib/supabase";
import type { ProductVariant } from "../types";

export async function createProductVariant(
  productId: string,
  values: {
    name: string;
    sku?: string;
    price: number;
    stock: number;
    attributes: Record<string, string>;
  },
) {
  const { data, error } = await supabase
    .from("product_variants")
    .insert({
      product_id: productId,
      name: values.name.trim(),
      sku: values.sku?.trim() || null,
      price: values.price,
      stock: values.stock,
      attributes: values.attributes,
    })
    .select()
    .single();

  if (error) {
    if (error.code === "23505") {
      throw new Error("A variant with this SKU already exists.");
    }

    throw new Error("Unable to create product variant.");
  }

  return data as ProductVariant;
}

export async function getProductVariants(productId: string) {
  const { data, error } = await supabase
    .from("product_variants")
    .select("*")
    .eq("product_id", productId)
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error("Unable to load product variants.");
  }

  return data as ProductVariant[];
}

export async function deleteProductVariant(id: string) {
  const { data, error } = await supabase
    .from("product_variants")
    .delete()
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error("Unable to delete product variant.");
  }

  return data;
}

export async function updateProductVariant(
  id: string,
  values: {
    name: string;
    sku?: string;
    price: number;
    stock: number;
    attributes: Record<string, string>;
  },
) {
  const { data, error } = await supabase
    .from("product_variants")
    .update({
      name: values.name.trim(),
      sku: values.sku?.trim() || null,
      price: values.price,
      stock: values.stock,
      attributes: values.attributes,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    if (error.code === "23505") {
      throw new Error("A variant with this SKU already exists.");
    }

    throw new Error("Unable to update product variant.");
  }

  return data as ProductVariant;
}
