export const dashboardQueryKeys = {
  all: ["dashboard"] as const,

  stats: () => ["dashboard", "stats"] as const,

  recentProducts: () => ["dashboard", "recent-products"] as const,

  recentOrders: () => ["dashboard", "recent-orders"] as const,
};
