export const orderQueryKeys = {
  all: ["orders"] as const,

  list: (search: string, status: string, page: number) =>
    ["orders", "list", search, status, page] as const,

  detail: (id: string) => ["orders", "detail", id] as const,
};
