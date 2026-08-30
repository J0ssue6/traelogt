import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCategoryImage } from "../api/categories.api";
import { categoriesQueryKeys } from "../query-keys";

export function useUpdateCategoryImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, imageFile }: { id: string; imageFile: File }) =>
      updateCategoryImage(id, imageFile),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: categoriesQueryKeys.all,
      });
    },
  });
}
