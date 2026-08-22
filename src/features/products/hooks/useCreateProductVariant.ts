import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProductVariant } from "../api/product-variants.api";
import { productQueryKeys } from "../query-keys";

export function useCreateProductVariant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      productId,
      values,
    }: {
      productId: string;
      values: {
        name: string;
        sku?: string;
        price: number;
        stock: number;
        attributes: Record<string, string>;
      };
    }) => createProductVariant(productId, values),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [productQueryKeys.variants(variables.productId)],
      });
    },
  });
}
