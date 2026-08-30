import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  categorySchema,
  type CategoryFormValues,
} from "@/features/categories/schemas/category.schema";

type CategoryFormProps = {
  onSubmit: (name: string, imageFile?: File) => Promise<void>;
  isSubmitting: boolean;
  error?: string;
};

function CategoryForm({ onSubmit, isSubmitting, error }: CategoryFormProps) {
  const [imageFile, setImageFile] = useState<File | undefined>();

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

  const handleFormSubmit = async (values: CategoryFormValues) => {
    await onSubmit(values.name, imageFile);

    reset();
    setImageFile(undefined);
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="w-full max-w-md space-y-4 rounded-lg border p-4 sm:p-6"
    >
      <div>
        <h2 className="text-base font-semibold sm:text-lg">Add category</h2>

        <p className="text-sm text-muted-foreground">
          Create a new product category.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="category-name">Category name</Label>

        <Input
          id="category-name"
          placeholder="Electronics"
          {...register("name")}
        />

        {errors.name && (
          <p className="text-sm text-destructive">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="category-image">Category image</Label>

        <Input
          id="category-image"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={(event) => {
            setImageFile(event.target.files?.[0]);
          }}
        />
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full sm:w-auto"
      >
        {isSubmitting ? "Adding..." : "Add category"}
      </Button>
    </form>
  );
}

export default CategoryForm;
