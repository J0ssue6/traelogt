import { useQuery } from "@tanstack/react-query";

import { getStorefrontProducts } from "@/features/storefront/api/storefront.api";

import { storefrontQueryKeys } from "@/features/storefront/query-keys";

export function useStorefrontProducts(search = "", page = 1, category = "") {
  return useQuery({
    queryKey: storefrontQueryKeys.productList(search, page, category),
    queryFn: () =>
      getStorefrontProducts(
        {
          search,
          category,
        },
        page,
      ),
  });
}
