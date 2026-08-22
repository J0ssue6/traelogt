export const productQueryKeys = {
  all: ["products"] as const,

  list: (search: string, page: number) =>
    ["products", "list", search, page] as const,

  variants: (productId: string) => ["product-variants", productId] as const,
};
