import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createProduct } from "../api/products.api";
import { createProductVariant } from "../api/product-variants.api";
import { uploadProductImage } from "../api/product-images.api";
import { productQueryKeys } from "../query-keys";

export type CreateProductInput = {
  name: string;
  description?: string | null;
  category_id: string;
  price: number;
  stock: number;
  images: File[];
};

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      name,
      description,
      category_id,
      price,
      stock,
      images,
    }: CreateProductInput) => {
      const product = await createProduct({
        name,
        description: description ?? null,
        category_id,
      });

      try {
        await createProductVariant(product.id, {
          name: "Default",
          sku: undefined,
          price,
          stock,
          attributes: {},
        });

        for (const [index, image] of images.entries()) {
          await uploadProductImage(product.id, image, index);
        }

        return product;
      } catch (error) {
        throw error;
      }
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: productQueryKeys.all,
      });
    },
  });
}
