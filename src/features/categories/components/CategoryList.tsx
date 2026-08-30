import { Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";

import type { Category } from "@/features/categories/types";

type CategoryListProps = {
  categories: Category[];
  isLoading: boolean;
  isError: boolean;
  onEdit: (category: Category) => void;
};

function CategoryList({
  categories,
  isLoading,
  isError,
  onEdit,
}: CategoryListProps) {
  return (
    <div className="min-w-0 space-y-3">
      <h2 className="text-base font-semibold sm:text-lg">
        Existing categories
      </h2>

      {isLoading && (
        <p className="text-sm text-muted-foreground">Loading categories...</p>
      )}

      {isError && (
        <p className="text-sm text-destructive">
          Unable to load categories. Please try again.
        </p>
      )}

      {!isLoading && !isError && categories.length === 0 && (
        <p className="text-sm text-muted-foreground">No categories yet.</p>
      )}

      {!isLoading &&
        !isError &&
        categories.map((category) => (
          <div
            key={category.id}
            className="flex min-w-0 flex-col gap-3 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="min-w-0">
              <p className="truncate font-medium">{category.name}</p>

              <p className="truncate text-sm text-muted-foreground">
                /{category.slug}
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-3">
              <span className="text-sm text-muted-foreground">
                {category.active ? "Active" : "Inactive"}
              </span>

              <Button
                type="button"
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={() => onEdit(category)}
              >
                <Pencil className="size-4" />
                Edit
              </Button>
            </div>
          </div>
        ))}
    </div>
  );
}

export default CategoryList;
