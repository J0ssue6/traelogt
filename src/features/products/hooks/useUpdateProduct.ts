import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateProduct } from "../api/products.api";
import { productQueryKeys } from "../query-keys";

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      values,
    }: {
      id: string;
      values: {
        name: string;
        description?: string | null;
        category_id: string;
      };
    }) =>
      updateProduct(id, {
        ...values,
        description: values.description ?? null,
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: productQueryKeys.all,
      });
    },
  });
}
