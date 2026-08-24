import { useEffect, useState } from "react";
import { Search, X } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useStorefrontProducts } from "@/features/storefront/hooks/useStorefrontProducts";
import ProductGrid from "@/features/storefront/components/StorefrontProductCard";

function Products() {
  const { t } = useTranslation("storefront");
  const [searchParams, setSearchParams] = useSearchParams();

  const initialSearch = searchParams.get("search") ?? "";
  const initialCategory = searchParams.get("category") ?? "";

  const [search, setSearch] = useState(initialSearch);
  const [page, setPage] = useState(1);

  const category = initialCategory;

  useEffect(() => {
    setSearch(initialSearch);
    setPage(1);
  }, [initialSearch, initialCategory]);

  const products = useStorefrontProducts({
    search,
    page,
    category,
  });

  const total = products.data?.total ?? 0;
  const pageSize = 20;
  const totalPages = Math.ceil(total / pageSize);

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);

    const nextParams = new URLSearchParams(searchParams);

    if (value.trim()) {
      nextParams.set("search", value);
    } else {
      nextParams.delete("search");
    }

    setSearchParams(nextParams);
  };

  const clearFilters = () => {
    setSearch("");
    setPage(1);
    setSearchParams({});
  };

  // Format category name for display
  const formattedCategory = category ? category.replace(/-/g, " ") : "";

  return (
    <>
      <section className="border-b">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            {t("header.navigation.shop")}
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            {category ? t("products.titleWithCategory") : t("products.title")}
          </h1>

          <p className="mt-4 max-w-2xl text-muted-foreground">
            {category
              ? t("products.categoryDescription", {
                  category: formattedCategory,
                })
              : t("products.description")}
          </p>

          <div className="mt-8 flex max-w-2xl flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                value={search}
                onChange={(event) => handleSearch(event.target.value)}
                placeholder={t("products.searchPlaceholder")}
                className="h-11 pl-9"
              />
            </div>

            {(search || category) && (
              <Button
                type="button"
                variant="outline"
                className="gap-2"
                onClick={clearFilters}
              >
                <X />
                {t("products.clear")}
              </Button>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
        {products.isError ? (
          <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-8 text-center">
            <h2 className="font-semibold">{t("products.error.title")}</h2>

            <p className="mt-2 text-sm text-muted-foreground">
              {t("products.error.description")}
            </p>

            <Button
              variant="outline"
              className="mt-5"
              onClick={() => products.refetch()}
            >
              {t("products.error.retry")}
            </Button>
          </div>
        ) : (
          <>
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {products.isLoading
                  ? t("products.loading")
                  : t("products.productCount", { count: total })}
              </p>
            </div>

            {!products.isLoading && products.data?.products.length === 0 ? (
              <div className="rounded-xl border border-dashed p-12 text-center">
                <h2 className="font-semibold">{t("products.empty.title")}</h2>

                <p className="mt-2 text-sm text-muted-foreground">
                  {t("products.empty.description")}
                </p>

                <Button
                  variant="outline"
                  className="mt-5"
                  onClick={clearFilters}
                >
                  {t("products.empty.viewAll")}
                </Button>
              </div>
            ) : (
              <ProductGrid
                products={products.data?.products ?? []}
                isLoading={products.isLoading}
              />
            )}

            {totalPages > 1 && (
              <div className="mt-10 flex items-center justify-between border-t pt-6">
                <Button
                  variant="outline"
                  disabled={page === 1 || products.isFetching}
                  onClick={() => setPage((current) => current - 1)}
                >
                  {t("products.pagination.previous")}
                </Button>

                <span className="text-sm text-muted-foreground">
                  {t("products.pagination.pageOf", {
                    current: page,
                    total: totalPages,
                  })}
                </span>

                <Button
                  variant="outline"
                  disabled={page === totalPages || products.isFetching}
                  onClick={() => setPage((current) => current + 1)}
                >
                  {t("products.pagination.next")}
                </Button>
              </div>
            )}
          </>
        )}
      </section>
    </>
  );
}

export default Products;
