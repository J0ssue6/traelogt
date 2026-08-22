export const storefrontQueryKeys = {
  all: ["storefront"] as const,

  productList: (search = "", page = 1, category = "") =>
    [
      "storefront",
      "products",
      {
        search,
        page,
        category,
      },
    ] as const,

  product: (slug: string) => ["storefront", "product", slug] as const,
};
