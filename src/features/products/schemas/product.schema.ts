import { z } from "zod";

export const productSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Product name must be at least 2 characters.")
    .max(150, "Product name must be less than 150 characters."),

  description: z
    .string()
    .trim()
    .max(2000, "Description must be less than 2000 characters.")
    .optional(),

  category_id: z.string().uuid("Please select a category."),
});

export type ProductFormValues = z.infer<typeof productSchema>;
