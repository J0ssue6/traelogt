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

import { Pencil, Trash2 } from "lucide-react";

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
    <div className="min-w-0 space-y-4 sm:space-y-6">
      {/* PAGE HEADER */}
      <div className="min-w-0">
        <h1 className="text-xl font-bold sm:text-2xl">Product Variants</h1>

        <p className="text-sm text-muted-foreground sm:text-base">
          Manage variants for this product.
        </p>
      </div>

      {/* ACTION */}
      <div>
        <Button
          className="w-full sm:w-auto"
          onClick={() => setIsCreateOpen(true)}
        >
          Add Variant
        </Button>
      </div>

      {/* STATES */}
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

      {/* DESKTOP TABLE */}
      {variants.data && variants.data.length > 0 && (
        <div className="hidden min-w-0 max-w-full sm:block">
          <ProductVariantTable
            variants={variants.data}
            onDelete={handleDeleteVariant}
            onEdit={setEditingVariant}
          />
        </div>
      )}

      {/* MOBILE CARDS */}
      {variants.data && variants.data.length > 0 && (
        <div className="space-y-3 sm:hidden">
          {variants.data.map((variant) => (
            <div
              key={variant.id}
              className="rounded-xl border bg-background p-4"
            >
              {/* VARIANT NAME */}
              <div className="min-w-0">
                <h2 className="break-words font-semibold">{variant.name}</h2>

                {variant.sku && (
                  <p className="mt-1 break-all text-xs text-muted-foreground">
                    SKU: {variant.sku}
                  </p>
                )}
              </div>

              {/* PRICE / STOCK */}
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-muted/50 p-3">
                  <p className="text-xs text-muted-foreground">Price</p>

                  <p className="mt-1 font-semibold">Q{variant.price}</p>
                </div>

                <div className="rounded-lg bg-muted/50 p-3">
                  <p className="text-xs text-muted-foreground">Stock</p>

                  <p className="mt-1 font-semibold">{variant.stock}</p>
                </div>
              </div>

              {/* ATTRIBUTES */}
              {variant.attributes &&
                Object.keys(variant.attributes).length > 0 && (
                  <div className="mt-4 border-t pt-4">
                    <p className="mb-2 text-xs font-medium text-muted-foreground">
                      Attributes
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {Object.entries(variant.attributes).map(
                        ([key, value]) => (
                          <div
                            key={key}
                            className="rounded-md bg-muted px-2 py-1 text-xs"
                          >
                            <span className="font-medium">{key}:</span>{" "}
                            {String(value)}
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                )}

              {/* ACTIONS */}
              <div className="mt-4 flex gap-2 border-t pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 gap-2"
                  onClick={() => setEditingVariant(variant)}
                >
                  <Pencil className="size-4" />
                  Edit
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 gap-2 text-destructive hover:text-destructive"
                  disabled={deleteVariant.isPending}
                  onClick={() => handleDeleteVariant(variant)}
                >
                  <Trash2 className="size-4" />
                  {deleteVariant.isPending ? "Deleting..." : "Delete"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CREATE VARIANT */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent
          className="
            flex
            max-h-[calc(100dvh-2rem)]
            w-[calc(100%-1rem)]
            max-w-[calc(100%-1rem)]
            flex-col
            gap-0
            overflow-hidden
            bg-background
            p-4
            sm:max-h-[90vh]
            sm:w-full
            sm:max-w-2xl
            sm:p-6
          "
        >
          <DialogHeader className="shrink-0 pr-6">
            <DialogTitle>Add variant</DialogTitle>
          </DialogHeader>

          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain pr-1">
            <div className="space-y-4 pt-4">
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
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* EDIT VARIANT */}
      <Dialog
        open={Boolean(editingVariant)}
        onOpenChange={(open) => {
          if (!open) {
            setEditingVariant(null);
          }
        }}
      >
        <DialogContent
          className="
            flex
            max-h-[calc(100dvh-2rem)]
            w-[calc(100%-1rem)]
            max-w-[calc(100%-1rem)]
            flex-col
            gap-0
            overflow-hidden
            bg-background
            p-4
            sm:max-h-[90vh]
            sm:w-full
            sm:max-w-2xl
            sm:p-6
          "
        >
          <DialogHeader className="shrink-0 pr-6">
            <DialogTitle>Edit variant</DialogTitle>
          </DialogHeader>

          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain pr-1">
            <div className="space-y-4 pt-4">
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
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ProductVariants;
