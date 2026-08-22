import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  productVariantSchema,
  type ProductVariantFormValues,
} from "../schemas/product-variant.schema";

type ProductVariantFormProps = {
  defaultValues?: ProductVariantFormValues;
  onSubmit: (values: ProductVariantFormValues) => Promise<void>;
  isSubmitting?: boolean;
};

function ProductVariantForm({
  defaultValues,
  onSubmit,
  isSubmitting = false,
}: ProductVariantFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductVariantFormValues, unknown, ProductVariantFormValues>({
    resolver: zodResolver(productVariantSchema) as never,
    defaultValues: defaultValues ?? {
      name: "",
      sku: "",
      price: 0,
      stock: 0,
      attributes: {},
    },
  });

  const handleFormSubmit = async (values: ProductVariantFormValues) => {
    await onSubmit(values);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="space-y-4 rounded-lg border p-6"
    >
      <div className="space-y-2">
        <Label htmlFor="variant-name">Variant name</Label>

        <Input
          id="variant-name"
          placeholder="Black / 42"
          {...register("name")}
        />

        {errors.name && (
          <p className="text-sm text-destructive">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="sku">SKU</Label>

        <Input id="sku" placeholder="HEADPHONE-BLK-42" {...register("sku")} />

        {errors.sku && (
          <p className="text-sm text-destructive">{errors.sku.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">Price</Label>

          <Input id="price" type="number" step="0.01" {...register("price")} />

          {errors.price && (
            <p className="text-sm text-destructive">{errors.price.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="stock">Stock</Label>

          <Input id="stock" type="number" {...register("stock")} />

          {errors.stock && (
            <p className="text-sm text-destructive">{errors.stock.message}</p>
          )}
        </div>
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Adding..." : "Add variant"}
      </Button>
    </form>
  );
}

export default ProductVariantForm;
