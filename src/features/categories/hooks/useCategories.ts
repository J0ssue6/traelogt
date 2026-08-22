import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../api/categories.api";
import { categoriesQueryKeys } from "../query-keys";

export function useCategories() {
  return useQuery({
    queryKey: [categoriesQueryKeys.all],
    queryFn: getCategories,
  });
}
