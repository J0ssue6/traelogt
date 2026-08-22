import { supabase } from "@/lib/supabase";
import type { ProductImage } from "../types";

const BUCKET = "product-images";

export async function getProductImages(productId: string) {
  const { data, error } = await supabase
    .from("product_images")
    .select("*")
    .eq("product_id", productId)
    .order("sort_order", { ascending: true });

  if (error) {
    throw new Error("Unable to load product images.");
  }

  return data as ProductImage[];
}

export async function uploadProductImage(
  productId: string,
  file: File,
  sortOrder = 0,
) {
  const extension = file.name.split(".").pop()?.toLowerCase() ?? "webp";
  const fileName = `${crypto.randomUUID()}.${extension}`;
  const storagePath = `${productId}/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(storagePath, file, {
      contentType: file.type,
      upsert: false,
    });

  if (uploadError) {
    throw new Error("Unable to upload product image.");
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from(BUCKET).getPublicUrl(storagePath);

  const { data, error: imageError } = await supabase
    .from("product_images")
    .insert({
      product_id: productId,
      url: publicUrl,
      storage_path: storagePath,
      alt_text: file.name,
      sort_order: sortOrder,
    })
    .select()
    .single();

  if (imageError) {
    await supabase.storage.from(BUCKET).remove([storagePath]);
    throw new Error("Unable to save product image.");
  }

  return data as ProductImage;
}

export async function deleteProductImage(image: ProductImage) {
  const { error: storageError } = await supabase.storage
    .from(BUCKET)
    .remove([image.storage_path]);

  if (storageError) {
    throw new Error("Unable to delete product image.");
  }

  const { error } = await supabase
    .from("product_images")
    .delete()
    .eq("id", image.id);

  if (error) {
    throw new Error("Unable to delete product image record.");
  }
}
