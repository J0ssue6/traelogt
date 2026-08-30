import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCategory } from "../api/categories.api";
import { categoriesQueryKeys } from "../query-keys";

export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ name, imageFile }: { name: string; imageFile?: File }) =>
      createCategory(name, imageFile),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [categoriesQueryKeys.all],
      });
    },
  });
}
