import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";

import { useStorefrontProducts } from "@/features/storefront/hooks/useStorefrontProducts";
import ProductGrid from "./ProductGrid";
import { useTranslation } from "react-i18next";

function FeaturedProducts() {
  const navigate = useNavigate();
  const { t } = useTranslation("home");

  const products = useStorefrontProducts({
    page: 1,
  });

  return (
    <section id="shop" className="border-b">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              {t("featuredProducts.eyebrow")}
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              {t("featuredProducts.title")}
            </h2>

            <p className="mt-4 max-w-xl text-muted-foreground">
              {t("featuredProducts.description")}
            </p>
          </div>

          <Button
            variant="outline"
            className="hidden sm:flex"
            onClick={() => navigate("/products")}
          >
            {t("featuredProducts.viewAll")}
          </Button>
        </div>

        {products.isError ? (
          <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-8 text-center">
            <h3 className="font-semibold">
              {t("featuredProducts.error.title")}
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              {t("featuredProducts.error.description")}
            </p>

            <Button
              variant="outline"
              className="mt-5"
              onClick={() => products.refetch()}
            >
              {t("featuredProducts.error.retry")}
            </Button>
          </div>
        ) : products.data?.products.length === 0 ? (
          <div className="rounded-xl border border-dashed p-10 text-center">
            <h3 className="font-semibold">
              {t("featuredProducts.empty.title")}
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              {t("featuredProducts.empty.description")}
            </p>
          </div>
        ) : (
          <ProductGrid
            products={products.data?.products ?? []}
            isLoading={products.isLoading}
          />
        )}

        <div className="mt-8 sm:hidden">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => navigate("/products")}
          >
            {t("featuredProducts.viewAllProducts")}
          </Button>
        </div>
      </div>
    </section>
  );
}

export default FeaturedProducts;
