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
  onSubmit: (values: ProductFormValues) => Promise<void>;
  isSubmitting?: boolean;
};

function ProductForm({
  categories,
  defaultValues,
  onSubmit,
  isSubmitting = false,
}: ProductFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: defaultValues ?? {
      name: "",
      description: "",
      category_id: "",
    },
  });

  return (
    <form
      onSubmit={handleSubmit(async (values) => {
        await onSubmit(values);
        reset();
      })}
      className="max-w-2xl space-y-6 rounded-lg border p-6"
    >
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

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Creating..." : "Create product"}
      </Button>
    </form>
  );
}

export default ProductForm;
