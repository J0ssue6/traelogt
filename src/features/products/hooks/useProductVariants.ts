import { useQuery } from "@tanstack/react-query";
import { getProductVariants } from "../api/product-variants.api";
import { productQueryKeys } from "../query-keys";

export function useProductVariants(productId: string) {
  return useQuery({
    queryKey: productQueryKeys.variants(productId),
    queryFn: () => getProductVariants(productId),
    enabled: Boolean(productId),
  });
}
