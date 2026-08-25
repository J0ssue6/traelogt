import HeroSection from "@/features/storefront/components/HeroSection";
import FeaturedProducts from "@/features/storefront/components/FeaturedProducts";
import MobileHomeFilters from "@/features/storefront/components/MobileHomeFilters";
import CategoryGrid from "@/features/products/components/CategoryGrid";
import { useTranslation } from "react-i18next";

function Home() {
  const { t } = useTranslation("home");

  return (
    <>
      <HeroSection />

      <MobileHomeFilters />

      <FeaturedProducts />

      <section
        id="categories"
        className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20"
      >
        <div className="mb-10 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            {t("categories.eyebrow")}
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            {t("categories.title")}
          </h2>

          <p className="mt-4 text-muted-foreground">
            {t("categories.description")}
          </p>
        </div>

        <CategoryGrid />
      </section>
    </>
  );
}

export default Home;
