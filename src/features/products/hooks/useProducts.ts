import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/products.api";
import { productQueryKeys } from "../query-keys";

export function useProducts(search = "", page = 1) {
  return useQuery({
    queryKey: productQueryKeys.list(search, page),
    queryFn: () => getProducts(search, page),
  });
}
