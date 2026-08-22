import type {
  Product,
  ProductImage,
  ProductVariant,
} from "@/features/products/types";

import type { Category } from "@/features/categories/types";

export type StorefrontProduct = Product & {
  category: Category | null;
  images: ProductImage[];
  variants: ProductVariant[];
};
