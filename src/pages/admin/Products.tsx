import { useState, useEffect } from "react";
import ProductForm from "@/features/products/components/ProductForm";
import { useCategories } from "@/features/categories/hooks/useCategories";
import { useCreateProduct } from "@/features/products/hooks/useCreateProduct";
import type { ProductFormValues } from "@/features/products/schemas/product.schema";
import { useProducts } from "@/features/products/hooks/useProducts";
import { useDebouncedValue } from "@/features/products/hooks/useDebouncedValue";
import { Input } from "@/components/ui/input";
import ProductTable from "@/features/products/components/ProductTable";
import type { Product } from "@/features/products/types";
import { useNavigate } from "react-router-dom";
import { useUpdateProduct } from "@/features/products/hooks/useUpdateProduct";
import { useDeleteProduct } from "@/features/products/hooks/useDeleteProduct";

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
import { Button } from "@/components/ui/button";
import ProductImageManager from "@/features/products/components/ProductImageManager";

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
    await createProduct.mutateAsync({ ...values, description: values.description ?? null });
    setIsCreateOpen(false);
  };

  const handleManageVariants = (product: Product) => {
    navigate(`/admin/products/${product.id}/variants`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Products</h1>
        <p className="text-muted-foreground">Manage your Traelogt products.</p>

        <Button onClick={() => setIsCreateOpen(true)}>Add Product</Button>
      </div>

      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto bg-background sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create product</DialogTitle>
          </DialogHeader>

          {categories.isLoading && <p>Loading categories...</p>}

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
        </DialogContent>
      </Dialog>

      <div className="max-w-md">
        <Input
          placeholder="Search products..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Existing products</h2>

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

        {products.data?.products && products.data.products.length > 0 && (
          <ProductTable
            products={products.data.products}
            onManageVariants={handleManageVariants}
            onEdit={setEditingProduct}
            onDelete={setProductToDelete}
          />
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t pt-4">
            <Button
              variant="outline"
              disabled={page === 1 || products.isFetching}
              onClick={() => setPage((current) => current - 1)}
            >
              Previous
            </Button>

            <span className="text-sm text-muted-foreground">
              Page {page} of {totalPages}
            </span>

            <Button
              variant="outline"
              disabled={page === totalPages || products.isFetching}
              onClick={() => setPage((current) => current + 1)}
            >
              Next
            </Button>
          </div>
        )}
      </div>

      {createProduct.isError && (
        <p className="text-sm text-destructive">
          {createProduct.error.message}
        </p>
      )}

      <Dialog
        open={Boolean(editingProduct)}
        onOpenChange={(open) => {
          if (!open) {
            setEditingProduct(null);
          }
        }}
      >
        <DialogContent className="max-h-[90vh] bg-background overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit product</DialogTitle>
          </DialogHeader>

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
        </DialogContent>
      </Dialog>
      <AlertDialog
        open={Boolean(productToDelete)}
        onOpenChange={(open) => {
          if (!open) {
            setProductToDelete(null);
          }
        }}
      >
        <AlertDialogContent className="max-h-[90vh] bg-background overflow-y-auto sm:max-w-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete product?</AlertDialogTitle>

            <AlertDialogDescription>
              This will permanently delete "{productToDelete?.name}". This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>

            <AlertDialogAction
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
