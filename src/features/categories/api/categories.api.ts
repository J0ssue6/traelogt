import { supabase } from "@/lib/supabase";
import type { Category } from "../types";

export async function createCategory(name: string, imageFile?: File) {
  const trimmedName = name.trim();
  const slug = trimmedName.toLowerCase().replace(/\s+/g, "-");

  let imageUrl: string | null = null;

  if (imageFile) {
    const fileExtension = imageFile.name.split(".").pop()?.toLowerCase();

    if (!fileExtension) {
      throw new Error("Unable to determine the image file type.");
    }

    const filePath = `${crypto.randomUUID()}.${fileExtension}`;

    const { error: uploadError } = await supabase.storage
      .from("category-images")
      .upload(filePath, imageFile, {
        cacheControl: "3600",
        upsert: false,
        contentType: imageFile.type,
      });

    if (uploadError) {
      throw new Error("Unable to upload category image. Please try again.");
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("category-images").getPublicUrl(filePath);

    imageUrl = publicUrl;
  }

  const { data, error } = await supabase
    .from("categories")
    .insert({
      name: trimmedName,
      slug,
      image_url: imageUrl,
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

export async function updateCategory(id: string, name: string) {
  const trimmedName = name.trim();
  const slug = trimmedName.toLowerCase().replace(/\s+/g, "-");

  const { data, error } = await supabase
    .from("categories")
    .update({
      name: trimmedName,
      slug,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    if (error.code === "23505") {
      throw new Error("A category with this name already exists.");
    }

    throw new Error("Unable to update category. Please try again.");
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
