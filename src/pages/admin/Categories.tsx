import { useState } from "react";

import { useCategories } from "@/features/categories/hooks/useCategories";
import { useCreateCategory } from "@/features/categories/hooks/useCreateCategory";
import { useUpdateCategory } from "@/features/categories/hooks/useUpdateCategory";
import { useUpdateCategoryImage } from "@/features/categories/hooks/useUpdateCategoryImage";
import type { Category } from "@/features/categories/types";

import CategoryForm from "@/features/categories/components/CategoryForm";
import CategoryList from "@/features/categories/components/CategoryList";
import EditCategoryDialog from "@/features/categories/components/EditCategoryDialog";

function Categories() {
  const categories = useCategories();
  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();
  const updateCategoryImage = useUpdateCategoryImage();

  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const handleCreate = async (name: string, imageFile?: File) => {
    await createCategory.mutateAsync({
      name,
      imageFile,
    });
  };

  const handleUpdate = async (id: string, name: string) => {
    await updateCategory.mutateAsync({
      id,
      name,
    });
    handleCloseEdit();
  };

  const handleUpdateImage = async (id: string, imageFile: File) => {
    await updateCategoryImage.mutateAsync({
      id,
      imageFile,
    });

    setEditingCategory(null);
  };

  const handleCloseEdit = () => {
    if (updateCategory.isPending || updateCategoryImage.isPending) {
      return;
    }

    setEditingCategory(null);
  };

  return (
    <div className="w-full min-w-0 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-xl font-bold sm:text-2xl">Categories</h1>

        <p className="text-sm text-muted-foreground sm:text-base">
          Manage your product categories.
        </p>
      </div>

      <CategoryForm
        onSubmit={handleCreate}
        isSubmitting={createCategory.isPending}
        error={
          createCategory.isError ? createCategory.error.message : undefined
        }
      />

      <CategoryList
        categories={categories.data ?? []}
        isLoading={categories.isLoading}
        isError={categories.isError}
        onEdit={setEditingCategory}
      />

      <EditCategoryDialog
        category={editingCategory}
        open={Boolean(editingCategory)}
        onOpenChange={(open) => {
          if (!open) {
            handleCloseEdit();
          }
        }}
        onSubmit={handleUpdate}
        onImageSubmit={handleUpdateImage}
        isSubmitting={updateCategory.isPending}
        isImageSubmitting={updateCategoryImage.isPending}
        error={
          updateCategory.isError ? updateCategory.error.message : undefined
        }
        imageError={
          updateCategoryImage.isError
            ? updateCategoryImage.error.message
            : undefined
        }
      />
    </div>
  );
}

export default Categories;
