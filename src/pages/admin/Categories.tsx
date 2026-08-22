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
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Categories</h1>
        <p className="text-muted-foreground">Manage your product categories.</p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md space-y-4 rounded-lg border p-6"
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
        <Button type="submit" disabled={createCategory.isPending}>
          {createCategory.isPending ? "Adding..." : "Add category"}
        </Button>
      </form>

      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Existing categories</h2>

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
            className="flex items-center justify-between rounded-lg border p-4"
          >
            <div>
              <p className="font-medium">{category.name}</p>
              <p className="text-sm text-muted-foreground">/{category.slug}</p>
            </div>

            <span className="text-sm text-muted-foreground">
              {category.active ? "Active" : "Inactive"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;
