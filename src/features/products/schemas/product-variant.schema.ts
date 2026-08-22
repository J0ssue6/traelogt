import { z } from "zod";

export const productVariantSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Variant name is required.")
    .max(100, "Variant name is too long."),

  sku: z.string().trim().max(50, "SKU is too long.").optional(),

  price: z.coerce.number().positive("Price must be greater than 0."),

  stock: z.coerce
    .number()
    .int("Stock must be a whole number.")
    .min(0, "Stock cannot be negative."),

  attributes: z.record(z.string(), z.string()).default({}),
});

export type ProductVariantFormValues = z.infer<typeof productVariantSchema>;
