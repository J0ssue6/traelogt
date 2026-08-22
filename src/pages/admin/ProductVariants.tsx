import { useParams } from "react-router-dom";
import { useProductVariants } from "@/features/products/hooks/useProductVariants";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import ProductVariantForm from "@/features/products/components/ProductVariantForm";
import { useCreateProductVariant } from "@/features/products/hooks/useCreateProductVariant";
import type { ProductVariantFormValues } from "@/features/products/schemas/product-variant.schema";

import ProductVariantTable from "@/features/products/components/ProductVariantTable";
import { useDeleteProductVariant } from "@/features/products/hooks/useDeleteProductVariant";
import type { ProductVariant } from "@/features/products/types";
import { useUpdateProductVariant } from "@/features/products/hooks/useUpdateProductVariant";

function ProductVariants() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingVariant, setEditingVariant] = useState<ProductVariant | null>(
    null,
  );

  const { productId } = useParams();
  const variants = useProductVariants(productId ?? "");
  const createVariant = useCreateProductVariant();
  const deleteVariant = useDeleteProductVariant();
  const updateVariant = useUpdateProductVariant();

  const handleDeleteVariant = async (variant: ProductVariant) => {
    if (!productId) return;

    await deleteVariant.mutateAsync({
      id: variant.id,
      productId,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Product Variants</h1>

        <p className="text-muted-foreground">
          Manage variants for this product.
        </p>
      </div>
      <Button onClick={() => setIsCreateOpen(true)}>Add Variant</Button>

      {variants.isLoading && (
        <p className="text-sm text-muted-foreground">Loading variants...</p>
      )}

      {variants.isError && (
        <p className="text-sm text-destructive">Unable to load variants.</p>
      )}

      {!variants.isLoading &&
        !variants.isError &&
        variants.data?.length === 0 && (
          <p className="text-sm text-muted-foreground">No variants yet.</p>
        )}

      {variants.data && variants.data.length > 0 && (
        <ProductVariantTable
          variants={variants.data}
          onDelete={handleDeleteVariant}
          onEdit={setEditingVariant}
        />
      )}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto bg-background sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add variant</DialogTitle>
          </DialogHeader>

          <ProductVariantForm
            onSubmit={async (values: ProductVariantFormValues) => {
              await createVariant.mutateAsync({
                productId: productId ?? "",
                values,
              });

              setIsCreateOpen(false);
            }}
            isSubmitting={createVariant.isPending}
          />

          {createVariant.isError && (
            <p className="text-sm text-destructive">
              {createVariant.error.message}
            </p>
          )}
        </DialogContent>
      </Dialog>
      <Dialog
        open={Boolean(editingVariant)}
        onOpenChange={(open) => {
          if (!open) {
            setEditingVariant(null);
          }
        }}
      >
        <DialogContent className="max-h-[90vh] overflow-y-auto bg-background sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit variant</DialogTitle>
          </DialogHeader>

          {editingVariant && (
            <ProductVariantForm
              defaultValues={{
                name: editingVariant.name,
                sku: editingVariant.sku ?? "",
                price: editingVariant.price,
                stock: editingVariant.stock,
                attributes: editingVariant.attributes ?? {},
              }}
              onSubmit={async (values) => {
                if (!productId) return;

                await updateVariant.mutateAsync({
                  id: editingVariant.id,
                  productId,
                  values,
                });

                setEditingVariant(null);
              }}
              isSubmitting={updateVariant.isPending}
            />
          )}

          {updateVariant.isError && (
            <p className="text-sm text-destructive">
              {updateVariant.error.message}
            </p>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ProductVariants;
