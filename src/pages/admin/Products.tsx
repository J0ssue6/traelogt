import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Pencil, Package, Trash2 } from "lucide-react";

import ProductForm from "@/features/products/components/ProductForm";
import ProductImageManager from "@/features/products/components/ProductImageManager";
import ProductTable from "@/features/products/components/ProductTable";

import { useCategories } from "@/features/categories/hooks/useCategories";
import { useCreateProduct } from "@/features/products/hooks/useCreateProduct";
import { useProducts } from "@/features/products/hooks/useProducts";
import { useDebouncedValue } from "@/features/products/hooks/useDebouncedValue";
import { useUpdateProduct } from "@/features/products/hooks/useUpdateProduct";
import { useDeleteProduct } from "@/features/products/hooks/useDeleteProduct";

import type { ProductFormValues } from "@/features/products/schemas/product.schema";
import type { Product } from "@/features/products/types";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

function Products() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const categories = useCategories();
  const createProduct = useCreateProduct();
  const debouncedSearch = useDebouncedValue(search);
  const products = useProducts(debouncedSearch, page);
  const navigate = useNavigate();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();

  const totalPages = Math.ceil((products.data?.total ?? 0) / 20);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  const handleSubmit = async (values: ProductFormValues) => {
    await createProduct.mutateAsync({
      ...values,
      description: values.description ?? null,
    });

    setIsCreateOpen(false);
  };

  const handleManageVariants = (product: Product) => {
    navigate(`/admin/products/${product.id}/variants`);
  };

  return (
    <div className="w-full min-w-0 space-y-4 sm:space-y-6">
      {/* PAGE HEADER */}
      <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-xl font-bold sm:text-2xl">Products</h1>

          <p className="text-sm text-muted-foreground sm:text-base">
            Manage your Traelogt products.
          </p>
        </div>

        <Button
          className="w-full sm:w-auto"
          onClick={() => setIsCreateOpen(true)}
        >
          Add Product
        </Button>
      </div>

      {/* CREATE PRODUCT DIALOG */}
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
            <DialogTitle>Create product</DialogTitle>
          </DialogHeader>

          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain pr-1">
            <div className="space-y-4 pt-4">
              {categories.isLoading && (
                <p className="text-sm text-muted-foreground">
                  Loading categories...
                </p>
              )}

              {categories.isError && (
                <p className="text-sm text-destructive">
                  Unable to load categories.
                </p>
              )}

              {!categories.isLoading && !categories.isError && (
                <ProductForm
                  categories={categories.data ?? []}
                  onSubmit={handleSubmit}
                  isSubmitting={createProduct.isPending}
                />
              )}

              {createProduct.isError && (
                <p className="text-sm text-destructive">
                  {createProduct.error.message}
                </p>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* SEARCH */}
      <div className="w-full sm:max-w-md">
        <Input
          placeholder="Search products..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      {/* PRODUCTS */}
      <div className="min-w-0 space-y-3">
        <h2 className="text-base font-semibold sm:text-lg">
          Existing products
        </h2>

        {products.isLoading && (
          <p className="text-sm text-muted-foreground">Loading products...</p>
        )}

        {products.isError && (
          <p className="text-sm text-destructive">Unable to load products.</p>
        )}

        {!products.isLoading &&
          !products.isError &&
          products.data?.products.length === 0 && (
            <p className="text-sm text-muted-foreground">No products yet.</p>
          )}

        {/* DESKTOP TABLE */}
        {products.data?.products && products.data.products.length > 0 && (
          <div className="hidden min-w-0 max-w-full sm:block">
            <ProductTable
              products={products.data.products}
              onManageVariants={handleManageVariants}
              onEdit={setEditingProduct}
              onDelete={setProductToDelete}
            />
          </div>
        )}

        {/* MOBILE PRODUCT CARDS */}
        {products.data?.products && products.data.products.length > 0 && (
          <div className="space-y-3 sm:hidden">
            {products.data.products.map((product) => (
              <div
                key={product.id}
                className="min-w-0 rounded-xl border bg-background p-4"
              >
                {/* PRODUCT INFO */}
                <div className="flex min-w-0 items-start gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                    <Package className="size-5 text-muted-foreground" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="break-words font-semibold">
                      {product.name}
                    </h3>

                    {product.category_id && (
                      <p className="mt-1 text-xs text-muted-foreground">
                        Category assigned
                      </p>
                    )}
                  </div>
                </div>

                {/* DESCRIPTION */}
                {product.description && (
                  <p className="mt-4 break-words text-sm text-muted-foreground">
                    {product.description}
                  </p>
                )}

                {/* DETAILS */}
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-lg bg-muted/50 p-3">
                    <p className="text-xs text-muted-foreground">Status</p>

                    <p className="mt-1 text-sm font-medium">
                      {product.active ? "Active" : "Inactive"}
                    </p>
                  </div>

                  <div className="rounded-lg bg-muted/50 p-3">
                    <p className="text-xs text-muted-foreground">ID</p>

                    <p className="mt-1 truncate text-sm font-medium">
                      {product.id.slice(0, 8)}
                    </p>
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="mt-4 grid grid-cols-2 gap-2 border-t pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full gap-2"
                    onClick={() => setEditingProduct(product)}
                  >
                    <Pencil className="size-4" />
                    Edit
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    className="w-full gap-2"
                    onClick={() => handleManageVariants(product)}
                  >
                    Manage variants
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    className="col-span-2 w-full gap-2 text-destructive hover:text-destructive"
                    onClick={() => setProductToDelete(product)}
                  >
                    <Trash2 className="size-4" />
                    Delete product
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex flex-col gap-3 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
            <Button
              variant="outline"
              className="w-full sm:w-auto"
              disabled={page === 1 || products.isFetching}
              onClick={() => setPage((current) => current - 1)}
            >
              Previous
            </Button>

            <span className="order-first text-center text-sm text-muted-foreground sm:order-none">
              Page {page} of {totalPages}
            </span>

            <Button
              variant="outline"
              className="w-full sm:w-auto"
              disabled={page === totalPages || products.isFetching}
              onClick={() => setPage((current) => current + 1)}
            >
              Next
            </Button>
          </div>
        )}
      </div>

      {/* EDIT PRODUCT DIALOG */}
      <Dialog
        open={Boolean(editingProduct)}
        onOpenChange={(open) => {
          if (!open) {
            setEditingProduct(null);
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
            <DialogTitle>Edit product</DialogTitle>
          </DialogHeader>

          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain pr-1">
            <div className="space-y-6 pt-4">
              {editingProduct && (
                <>
                  <ProductForm
                    categories={categories.data ?? []}
                    defaultValues={{
                      name: editingProduct.name,
                      description: editingProduct.description ?? "",
                      category_id: editingProduct.category_id ?? "",
                    }}
                    onSubmit={async (values) => {
                      await updateProduct.mutateAsync({
                        id: editingProduct.id,
                        values,
                      });

                      setEditingProduct(null);
                    }}
                    isSubmitting={updateProduct.isPending}
                  />

                  <ProductImageManager productId={editingProduct.id} />
                </>
              )}

              {updateProduct.isError && (
                <p className="text-sm text-destructive">
                  {updateProduct.error.message}
                </p>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* DELETE PRODUCT DIALOG */}
      <AlertDialog
        open={Boolean(productToDelete)}
        onOpenChange={(open) => {
          if (!open) {
            setProductToDelete(null);
          }
        }}
      >
        <AlertDialogContent className="w-[calc(100%-2rem)] max-w-[calc(100%-2rem)] bg-background sm:max-w-lg">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete product?</AlertDialogTitle>

            <AlertDialogDescription>
              This will permanently delete "{productToDelete?.name}". This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter className="flex-col gap-2 sm:flex-row">
            <AlertDialogCancel className="w-full sm:w-auto">
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              className="w-full sm:w-auto"
              disabled={deleteProduct.isPending}
              onClick={async () => {
                if (!productToDelete) return;

                await deleteProduct.mutateAsync({
                  id: productToDelete.id,
                });

                setProductToDelete(null);
              }}
            >
              {deleteProduct.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default Products;
