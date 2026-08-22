import { useQuery } from "@tanstack/react-query";

import { getStorefrontProducts } from "@/features/storefront/api/storefront.api";
import { storefrontQueryKeys } from "@/features/storefront/query-keys";

type UseStorefrontProductsOptions = {
  search?: string;
  page?: number;
  category?: string;
};

export function useStorefrontProducts({
  search = "",
  page = 1,
  category = "",
}: UseStorefrontProductsOptions = {}) {
  return useQuery({
    queryKey: storefrontQueryKeys.productList(search, page, category),
    queryFn: () => getStorefrontProducts(search, page, category),
  });
}
