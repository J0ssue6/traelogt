import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCategory } from "../api/categories.api";
import { categoriesQueryKeys } from "../query-keys";

export function useUpdateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, name }: { id: string; name: string }) =>
      updateCategory(id, name),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: categoriesQueryKeys.all,
      });
    },
  });
}
