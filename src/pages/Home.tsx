import StoreHeader from "@/features/storefront/components/StoreHeader";
import HeroSection from "@/features/storefront/components/HeroSection";
import FeaturedProducts from "@/features/storefront/components/FeaturedProducts";
import CategoryGrid from "@/features/products/components/CategoryGrid";

function Home() {
  return (
    <main className="min-h-screen bg-background">
      <StoreHeader />

      <HeroSection />

      <FeaturedProducts />

      <section
        id="categories"
        className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20"
      >
        <div className="mb-10 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            Explore
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Shop by category
          </h2>

          <p className="mt-4 text-muted-foreground">
            Browse Traelogt by category and find what you're looking for.
          </p>
        </div>

        <CategoryGrid />
      </section>
    </main>
  );
}

export default Home;
