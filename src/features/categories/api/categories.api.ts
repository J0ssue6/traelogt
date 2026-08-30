import { supabase } from "@/lib/supabase";
import type { Category } from "../types";

const CATEGORY_IMAGE_BUCKET = "category-images";

function getStoragePathFromPublicUrl(url: string | null) {
  if (!url) return null;

  const marker = `/storage/v1/object/public/${CATEGORY_IMAGE_BUCKET}/`;
  const markerIndex = url.indexOf(marker);

  if (markerIndex === -1) {
    return null;
  }

  return decodeURIComponent(url.slice(markerIndex + marker.length));
}

async function uploadCategoryImage(imageFile: File) {
  const fileExtension = imageFile.name.split(".").pop()?.toLowerCase();

  if (!fileExtension) {
    throw new Error("Unable to determine the image file type.");
  }

  const filePath = `${crypto.randomUUID()}.${fileExtension}`;

  const { error: uploadError } = await supabase.storage
    .from(CATEGORY_IMAGE_BUCKET)
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
  } = supabase.storage.from(CATEGORY_IMAGE_BUCKET).getPublicUrl(filePath);

  return {
    filePath,
    publicUrl,
  };
}

export async function createCategory(name: string, imageFile?: File) {
  const trimmedName = name.trim();
  const slug = trimmedName.toLowerCase().replace(/\s+/g, "-");

  let imageUrl: string | null = null;

  if (imageFile) {
    const { publicUrl } = await uploadCategoryImage(imageFile);
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

export async function updateCategoryImage(id: string, imageFile: File) {
  const { data: existingCategory, error: fetchError } = await supabase
    .from("categories")
    .select("image_url")
    .eq("id", id)
    .single();

  if (fetchError) {
    throw new Error("Unable to load the category image. Please try again.");
  }

  const { filePath: newFilePath, publicUrl } =
    await uploadCategoryImage(imageFile);

  const { data, error: updateError } = await supabase
    .from("categories")
    .update({
      image_url: publicUrl,
    })
    .eq("id", id)
    .select()
    .single();

  if (updateError) {
    await supabase.storage.from(CATEGORY_IMAGE_BUCKET).remove([newFilePath]);

    throw new Error("Unable to update category image. Please try again.");
  }

  const oldFilePath = getStoragePathFromPublicUrl(existingCategory.image_url);

  if (oldFilePath && oldFilePath !== newFilePath) {
    const { error: removeError } = await supabase.storage
      .from(CATEGORY_IMAGE_BUCKET)
      .remove([oldFilePath]);

    if (removeError) {
      throw new Error(
        "Category image was updated, but the previous image could not be removed.",
      );
    }
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
