import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProductVariant } from "../api/product-variants.api";
import { productQueryKeys } from "../query-keys";

export function useDeleteProductVariant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: string; productId: string }) =>
      deleteProductVariant(id),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [productQueryKeys.variants(variables.productId)],
      });
    },
  });
}
