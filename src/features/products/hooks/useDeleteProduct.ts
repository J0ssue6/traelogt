import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct } from "../api/products.api";
import { productQueryKeys } from "../query-keys";

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: string }) => deleteProduct(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [productQueryKeys.all],
      });
    },
  });
}
