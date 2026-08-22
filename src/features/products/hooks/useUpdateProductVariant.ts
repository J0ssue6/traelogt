import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProductVariant } from "../api/product-variants.api";
import { productQueryKeys } from "../query-keys";

export function useUpdateProductVariant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      values,
    }: {
      id: string;
      productId: string;
      values: {
        name: string;
        sku?: string;
        price: number;
        stock: number;
        attributes: Record<string, string>;
      };
    }) => updateProductVariant(id, values),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [productQueryKeys.variants(variables.productId)],
      });
    },
  });
}
