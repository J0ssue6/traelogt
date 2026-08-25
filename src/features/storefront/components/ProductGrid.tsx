import { useNavigate } from "react-router-dom";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import type { StorefrontProduct } from "@/features/storefront/api/storefront.api";

type ProductGridProps = {
  products: StorefrontProduct[];
  isLoading?: boolean;
};

function ProductGrid({ products, isLoading = false }: ProductGridProps) {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index} className="overflow-hidden">
            <Skeleton className="aspect-square rounded-none" />

            <CardContent className="space-y-3 p-5">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-5 w-24" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
      {products.map((product) => {
        const image = product.images[0];

        const prices = product.variants.map((variant) => variant.price);

        const lowestPrice = prices.length > 0 ? Math.min(...prices) : null;

        return (
          <Card
            key={product.id}
            className="group cursor-pointer overflow-hidden border transition-shadow hover:shadow-md"
            onClick={() => navigate(`/products/${product.slug}`)}
          >
            <div className="aspect-square overflow-hidden bg-muted">
              {image ? (
                <img
                  src={image.url}
                  alt={image.alt_text ?? product.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                  No image available
                </div>
              )}
            </div>

            <CardContent className="p-5">
              {product.category && (
                <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                  {product.category.name}
                </p>
              )}

              <h3 className="mt-2 font-semibold tracking-tight group-hover:text-accent">
                {product.name}
              </h3>

              {lowestPrice !== null && (
                <p className="mt-2 font-semibold">${lowestPrice.toFixed(2)}</p>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

export default ProductGrid;
