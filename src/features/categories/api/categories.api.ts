import { supabase } from "@/lib/supabase";
import type { Category } from "../types";

export async function createCategory(name: string) {
  const slug = name.trim().toLowerCase().replace(/\s+/g, "-");

  const { data, error } = await supabase
    .from("categories")
    .insert({
      name: name.trim(),
      slug,
    })
    .select()
    .single();

  if (error) {
    if (error.code === "23505") {
      throw new Error("A category with this name already exists.");
    }

    throw new Error("Unable to create category. Please try again.");
  }

  return data as Category;
}

export async function getCategories() {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) throw error;

  return data as Category[];
}
