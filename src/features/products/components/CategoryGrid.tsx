import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import { useCategories } from "@/features/categories/hooks/useCategories";
import { useTranslation } from "react-i18next";

function CategoryGrid() {
  const navigate = useNavigate();
  const categories = useCategories();
  const { t } = useTranslation("storefront");

  if (categories.isLoading) {
    return (
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index} className="overflow-hidden">
            <Skeleton className="aspect-[4/3] rounded-none" />

            <CardContent className="p-5">
              <Skeleton className="h-5 w-32" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (categories.isError) {
    return (
      <p className="text-sm text-destructive">{t("categories.grid.error")}</p>
    );
  }

  const activeCategories = (categories.data ?? []).filter(
    (category) => category.active,
  );

  if (activeCategories.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        {t("categories.grid.empty")}
      </p>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {activeCategories.map((category) => (
        <Card
          key={category.id}
          className="group cursor-pointer overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg"
          onClick={() => navigate(`/products?category=${category.slug}`)}
        >
          <div className="aspect-[4/3] overflow-hidden bg-secondary">
            {category.image_url ? (
              <img
                src={category.image_url}
                alt={category.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                {category.name}
              </div>
            )}
          </div>

          <CardContent className="flex items-start justify-between gap-4 p-5">
            <div>
              <h3 className="font-semibold tracking-tight transition-colors group-hover:text-accent">
                {category.name}
              </h3>

              {category.description && (
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                  {category.description}
                </p>
              )}
            </div>

            <ArrowRight className="mt-0.5 size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-accent" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default CategoryGrid;
