import { z } from "zod";

export const categorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Category name must be at least 2 characters.")
    .max(50, "Category name must be less than 50 characters."),
});

export type CategoryFormValues = z.infer<typeof categorySchema>;
