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
    .nullable()
    .optional(),

  category_id: z.string().uuid("Please select a category."),

  price: z.number().positive("Price must be greater than 0."),

  stock: z
    .number()
    .int("Stock must be a whole number.")
    .min(0, "Stock cannot be negative."),
});

export type ProductFormValues = z.infer<typeof productSchema>;
