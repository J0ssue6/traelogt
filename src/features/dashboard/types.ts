export type DashboardStats = {
  totalProducts: number;
  activeProducts: number;
  totalCategories: number;
  totalOrders: number;
};

export type DashboardProduct = {
  id: string;
  name: string;
  slug: string;
  active: boolean;
  created_at: string;
};

export type DashboardOrder = {
  id: string;
  status: string;
  total: number;
  created_at: string;
};
