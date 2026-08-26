import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
  productSchema,
  type ProductFormValues,
} from "../schemas/product.schema";

import type { Category } from "@/features/categories/types";

type ProductFormProps = {
  categories: Category[];
  defaultValues?: ProductFormValues;
  onSubmit: (values: ProductFormValues, images: File[]) => Promise<void>;
  isSubmitting?: boolean;
  mode?: "create" | "edit";
};

function ProductForm({
  categories,
  defaultValues,
  onSubmit,
  isSubmitting = false,
  mode = "create",
}: ProductFormProps) {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFormValues, unknown, ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: defaultValues ?? {
      name: "",
      description: "",
      category_id: "",
      price: 0,
      stock: 0,
    },
  });

  const handleFormSubmit = async (values: ProductFormValues) => {
    // IMPORTANT:
    // Pass the actual selected files instead of [].
    await onSubmit(values, selectedImages);

    reset();
    setSelectedImages([]);
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="max-w-2xl space-y-6 rounded-lg border p-6"
    >
      {/* PRODUCT NAME */}
      <div className="space-y-2">
        <Label htmlFor="name">Product name</Label>

        <Input
          id="name"
          placeholder="Wireless Bluetooth Headphones"
          {...register("name")}
        />

        {errors.name && (
          <p className="text-sm text-destructive">{errors.name.message}</p>
        )}
      </div>

      {/* DESCRIPTION */}
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>

        <Textarea
          id="description"
          placeholder="Describe the product..."
          rows={5}
          {...register("description")}
        />

        {errors.description && (
          <p className="text-sm text-destructive">
            {errors.description.message}
          </p>
        )}
      </div>

      {/* CATEGORY */}
      <div className="space-y-2">
        <Label htmlFor="category_id">Category</Label>

        <select
          id="category_id"
          className="border-input bg-background flex h-9 w-full rounded-md border px-3 py-1 text-sm shadow-xs"
          {...register("category_id")}
        >
          <option value="">Select a category</option>

          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        {errors.category_id && (
          <p className="text-sm text-destructive">
            {errors.category_id.message}
          </p>
        )}
      </div>

      {/* DEFAULT VARIANT */}
      <div className="space-y-4 rounded-lg border bg-muted/20 p-4">
        <div>
          <h3 className="font-semibold">Default variant</h3>

          <p className="text-sm text-muted-foreground">
            Set the initial price and stock. Additional variants can be added
            later.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* PRICE */}
          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>

            <Input
              id="price"
              type="number"
              min="0"
              step="0.01"
              placeholder="0.00"
              {...register("price", {
                valueAsNumber: true,
              })}
            />

            {errors.price && (
              <p className="text-sm text-destructive">{errors.price.message}</p>
            )}
          </div>

          {/* STOCK */}
          <div className="space-y-2">
            <Label htmlFor="stock">Stock</Label>

            <Input
              id="stock"
              type="number"
              min="0"
              step="1"
              placeholder="0"
              {...register("stock", {
                valueAsNumber: true,
              })}
            />

            {errors.stock && (
              <p className="text-sm text-destructive">{errors.stock.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* IMAGES */}
      {mode === "create" && (
        <div className="space-y-3 rounded-lg border bg-muted/20 p-4">
          <div>
            <h3 className="font-semibold">Product images</h3>

            <p className="text-sm text-muted-foreground">
              Select one or multiple images. These will be uploaded when the
              product is created.
            </p>
          </div>

          <Input
            id="product-images"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            disabled={isSubmitting}
            onChange={(event) => {
              setSelectedImages(Array.from(event.target.files ?? []));
            }}
          />

          {selectedImages.length > 0 && (
            <div className="space-y-1">
              <p className="text-sm font-medium">
                {selectedImages.length} image
                {selectedImages.length === 1 ? "" : "s"} selected
              </p>

              {selectedImages.map((file) => (
                <p
                  key={`${file.name}-${file.size}-${file.lastModified}`}
                  className="truncate text-xs text-muted-foreground"
                >
                  {file.name}
                </p>
              ))}
            </div>
          )}

          <p className="text-xs text-muted-foreground">JPG, PNG, or WebP.</p>
        </div>
      )}

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting
          ? mode === "create"
            ? "Creating..."
            : "Saving..."
          : mode === "create"
            ? "Create product"
            : "Save changes"}
      </Button>
    </form>
  );
}

export default ProductForm;
