import { useTranslation } from "react-i18next";

import CategoryGrid from "@/features/products/components/CategoryGrid";

function Categories() {
  const { t } = useTranslation("categories");

  return (
    <>
      <section className="border-b">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            {t("header.eyebrow")}
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            {t("header.title")}
          </h1>

          <p className="mt-4 max-w-2xl text-muted-foreground">
            {t("header.description")}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <CategoryGrid />
      </section>
    </>
  );
}

export default Categories;
