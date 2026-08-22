import StoreHeader from "@/features/storefront/components/StoreHeader";
import CategoryGrid from "@/features/products/components/CategoryGrid";

function Categories() {
  return (
    <main className="min-h-screen bg-background">
      <StoreHeader />

      <section className="border-b">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            Explore
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Shop by category
          </h1>

          <p className="mt-4 max-w-2xl text-muted-foreground">
            Find exactly what you're looking for by browsing our categories.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <CategoryGrid />
      </section>
    </main>
  );
}

export default Categories;
