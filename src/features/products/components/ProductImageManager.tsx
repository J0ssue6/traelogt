import { useEffect, useState } from "react";
import { ImagePlus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import type { ProductImage } from "@/features/products/types";
import {
  deleteProductImage,
  getProductImages,
  uploadProductImage,
} from "@/features/products/api/product-images.api";

type ProductImageManagerProps = {
  productId: string;
};

function ProductImageManager({ productId }: ProductImageManagerProps) {
  const [images, setImages] = useState<ProductImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadImages() {
      try {
        setIsLoading(true);
        setError(null);

        const data = await getProductImages(productId);

        if (!cancelled) {
          setImages(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Unable to load product images.",
          );
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    loadImages();

    return () => {
      cancelled = true;
    };
  }, [productId]);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);

    if (files.length === 0) return;

    try {
      setIsUploading(true);
      setError(null);

      const uploadedImages: ProductImage[] = [];

      for (const [index, file] of files.entries()) {
        const image = await uploadProductImage(
          productId,
          file,
          images.length + index,
        );

        uploadedImages.push(image);
      }

      setImages((current) => [...current, ...uploadedImages]);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to upload product images.",
      );
    } finally {
      setIsUploading(false);
      event.target.value = "";
    }
  };

  const handleDelete = async (image: ProductImage) => {
    try {
      setError(null);

      await deleteProductImage(image);

      setImages((current) => current.filter((item) => item.id !== image.id));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to delete product image.",
      );
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold">Product images</h3>

        <p className="text-sm text-muted-foreground">
          Add multiple product photos for the storefront.
        </p>
      </div>

      {isLoading && (
        <p className="text-sm text-muted-foreground">Loading images...</p>
      )}

      {!isLoading && images.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {images.map((image) => (
            <div
              key={image.id}
              className="group relative overflow-hidden rounded-lg border bg-muted"
            >
              <img
                src={image.url}
                alt={image.alt_text ?? "Product image"}
                className="aspect-square w-full object-cover"
              />

              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100"
                onClick={() => handleDelete(image)}
                aria-label="Delete image"
              >
                <Trash2 />
              </Button>
            </div>
          ))}
        </div>
      )}

      {!isLoading && images.length === 0 && (
        <div className="rounded-lg border border-dashed p-8 text-center">
          <ImagePlus className="mx-auto h-8 w-8 text-muted-foreground" />

          <p className="mt-2 text-sm text-muted-foreground">
            No product images yet.
          </p>
        </div>
      )}

      <div>
        <Input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          disabled={isUploading}
          onChange={handleUpload}
        />
      </div>

      {isUploading && (
        <p className="text-sm text-muted-foreground">Uploading images...</p>
      )}

      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}

export default ProductImageManager;
