import { Link } from "react-router-dom";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import type { DashboardProduct } from "../types";
import { Badge } from "@/components/ui/badge";

type RecentProductsProps = {
  products: DashboardProduct[];
};

function RecentProducts({ products }: RecentProductsProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent products</CardTitle>

        <Link
          to="/admin/products"
          className="inline-flex h-8 items-center justify-center rounded-md px-3 text-sm font-medium transition-colors hover:bg-muted"
        >
          View all
        </Link>
      </CardHeader>

      <CardContent>
        {products.length === 0 ? (
          <p className="text-sm text-muted-foreground">No products yet.</p>
        ) : (
          <div className="space-y-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between gap-4"
              >
                <div className="min-w-0">
                  <p className="truncate font-medium">{product.name}</p>

                  <p className="truncate text-sm text-muted-foreground">
                    {product.slug}
                  </p>
                </div>

                <Badge variant={product.active ? "default" : "secondary"}>
                  {product.active ? "Active" : "Inactive"}
                </Badge>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default RecentProducts;
