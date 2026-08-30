import { useEffect, useState } from "react";
import { ImagePlus, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  categorySchema,
  type CategoryFormValues,
} from "@/features/categories/schemas/category.schema";

import type { Category } from "@/features/categories/types";

type EditCategoryDialogProps = {
  category: Category | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (id: string, name: string) => Promise<void>;
  onImageSubmit: (id: string, imageFile: File) => Promise<void>;
  isSubmitting: boolean;
  isImageSubmitting: boolean;
  error?: string;
  imageError?: string;
};

function EditCategoryDialog({
  category,
  open,
  onOpenChange,
  onSubmit,
  onImageSubmit,
  isSubmitting,
  isImageSubmitting,
  error,
  imageError,
}: EditCategoryDialogProps) {
  const [imageFile, setImageFile] = useState<File | undefined>();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

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

  useEffect(() => {
    if (!category) {
      reset({
        name: "",
      });
      setImageFile(undefined);
      setImagePreview(null);
      return;
    }

    reset({
      name: category.name,
    });

    setImageFile(undefined);
    setImagePreview(category.image_url);
  }, [category, reset]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      setImageFile(undefined);
      setImagePreview(category?.image_url ?? null);
      return;
    }

    setImageFile(file);

    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  };

  const handleRemoveSelectedImage = () => {
    setImageFile(undefined);
    setImagePreview(category?.image_url ?? null);
  };

  const handleFormSubmit = async (values: CategoryFormValues) => {
    if (!category) return;

    await onSubmit(category.id, values.name);

    if (imageFile) {
      await onImageSubmit(category.id, imageFile);
    }
  };

  const isBusy = isSubmitting || isImageSubmitting;

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (isBusy) return;

        onOpenChange(nextOpen);
      }}
    >
      <DialogContent className="w-[calc(100%-2rem)] max-w-md bg-background">
        <DialogHeader>
          <DialogTitle>Edit category</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="space-y-5 pt-2"
        >
          <div className="space-y-2">
            <Label htmlFor="edit-category-name">Category name</Label>

            <Input
              id="edit-category-name"
              placeholder="Electronics"
              {...register("name")}
            />

            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-category-image">Category image</Label>

            {imagePreview ? (
              <div className="relative overflow-hidden rounded-lg border">
                <img
                  src={imagePreview}
                  alt={category?.name ?? "Category"}
                  className="aspect-video w-full object-cover"
                />

                {imageFile && (
                  <Button
                    type="button"
                    variant="secondary"
                    size="icon"
                    className="absolute right-2 top-2"
                    disabled={isBusy}
                    onClick={handleRemoveSelectedImage}
                    aria-label="Cancel selected image"
                  >
                    <X className="size-4" />
                  </Button>
                )}
              </div>
            ) : (
              <div className="flex aspect-video items-center justify-center rounded-lg border border-dashed">
                <div className="flex flex-col items-center gap-2 text-center text-sm text-muted-foreground">
                  <ImagePlus className="size-6" />
                  <span>No category image</span>
                </div>
              </div>
            )}

            <Input
              id="edit-category-image"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              disabled={isBusy}
              onChange={handleImageChange}
            />

            <p className="text-xs text-muted-foreground">
              Select a new image to replace the current category image.
            </p>
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          {imageError && (
            <p className="text-sm text-destructive">{imageError}</p>
          )}

          <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              disabled={isBusy}
              onClick={() => onOpenChange(false)}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={isBusy}
              className="w-full sm:w-auto"
            >
              {isBusy
                ? isImageSubmitting
                  ? "Updating image..."
                  : "Saving..."
                : "Save changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditCategoryDialog;
