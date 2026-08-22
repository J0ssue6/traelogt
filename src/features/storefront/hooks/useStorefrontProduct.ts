import { useQuery } from "@tanstack/react-query";

import { getStorefrontProductBySlug } from "@/features/storefront/api/storefront.api";
import { storefrontQueryKeys } from "@/features/storefront/query-keys";

export function useStorefrontProduct(slug: string) {
  return useQuery({
    queryKey: storefrontQueryKeys.product(slug),
    queryFn: () => getStorefrontProductBySlug(slug),
    enabled: Boolean(slug),
  });
}
