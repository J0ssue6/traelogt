import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useCategories } from "@/features/categories/hooks/useCategories";
import { useCreateCategory } from "@/features/categories/hooks/useCreateCategory";
import {
  categorySchema,
  type CategoryFormValues,
} from "@/features/categories/schemas/category.schema";

function Categories() {
  const categories = useCategories();
  const createCategory = useCreateCategory();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = (values: CategoryFormValues) => {
    createCategory.mutate(values.name, {
      onSuccess: () => {
        reset();
      },
    });
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

      {/* Add Category */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md space-y-4 rounded-lg border p-4 sm:p-6"
      >
        <div className="space-y-2">
          <Label htmlFor="name">Category name</Label>

          <Input id="name" placeholder="Electronics" {...register("name")} />

          {errors.name && (
            <p className="text-sm text-destructive">{errors.name.message}</p>
          )}
        </div>

        {createCategory.isError && (
          <p className="text-sm text-destructive">
            {createCategory.error.message}
          </p>
        )}

        <Button
          type="submit"
          disabled={createCategory.isPending}
          className="w-full sm:w-auto"
        >
          {createCategory.isPending ? "Adding..." : "Add category"}
        </Button>
      </form>

      {/* Existing Categories */}
      <div className="min-w-0 space-y-3">
        <h2 className="text-base font-semibold sm:text-lg">
          Existing categories
        </h2>

        {categories.isLoading && (
          <p className="text-sm text-muted-foreground">Loading categories...</p>
        )}

        {categories.isError && (
          <p className="text-sm text-destructive">
            Unable to load categories. Please try again.
          </p>
        )}

        {!categories.isLoading &&
          !categories.isError &&
          categories.data?.length === 0 && (
            <p className="text-sm text-muted-foreground">No categories yet.</p>
          )}

        {categories.data?.map((category) => (
          <div
            key={category.id}
            className="flex min-w-0 flex-col gap-2 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="min-w-0">
              <p className="truncate font-medium">{category.name}</p>

              <p className="truncate text-sm text-muted-foreground">
                /{category.slug}
              </p>
            </div>

            <span className="shrink-0 text-sm text-muted-foreground">
              {category.active ? "Active" : "Inactive"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;
