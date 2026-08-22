import { ArrowRight, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";

function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="border-b">
      <div className="mx-auto grid min-h-[560px] max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:py-20">
        <div className="max-w-2xl">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            Welcome to Traelogt
          </p>

          <h1 className="text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            Discover more.
            <span className="mt-2 block text-accent">
              Get it from Traelogt.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
            Your marketplace for the things you want, the things you need, and
            the things you didn’t know you were looking for.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              className="gap-2"
              onClick={() => navigate("/products")}
            >
              Shop now
              <ArrowRight />
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="gap-2"
              onClick={() => navigate("/products")}
            >
              <ShoppingBag />
              Explore products
            </Button>
          </div>
        </div>

        <div className="relative hidden min-h-[440px] overflow-hidden rounded-3xl bg-primary lg:block">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(14,165,164,0.45),transparent_45%)]" />

          <div className="absolute right-[-10%] top-[-10%] size-80 rounded-full border border-accent/20" />

          <div className="absolute bottom-[-20%] right-[-5%] size-96 rounded-full border border-accent/20" />

          <div className="absolute bottom-10 left-10 max-w-sm text-primary-foreground">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-teal-200">
              One marketplace
            </p>

            <p className="mt-3 text-3xl font-semibold tracking-tight">
              A little bit of everything.
            </p>

            <p className="mt-4 text-sm leading-6 text-primary-foreground/70">
              Explore products, discover new favourites, and find something
              worth bringing home.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
