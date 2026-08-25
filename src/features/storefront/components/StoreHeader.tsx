import { Search, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useCart } from "@/features/cart/cart-context";
import logo from "@/assets/logo.png";
import LanguageSwitcher from "@/features/i18n/components/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import { ThemeToggle } from "@/components/ThemeToggle";

function StoreHeader() {
  const { itemCount } = useCart();
  const navigate = useNavigate();
  const { t } = useTranslation("storefront");

  const [search, setSearch] = useState("");
  const [mobileSearch, setMobileSearch] = useState("");

  const submitSearch = (value: string) => {
    const trimmed = value.trim();

    if (!trimmed) {
      navigate("/products");
      return;
    }

    navigate(`/products?search=${encodeURIComponent(trimmed)}`);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitSearch(search);
  };

  const handleMobileSearchSubmit = (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    submitSearch(mobileSearch);
  };

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Mobile header */}
        <div className="md:hidden">
          <div className="flex h-14 items-center gap-3">
            <Link
              to="/"
              className="flex min-w-0 shrink-0 items-center text-xl font-bold tracking-tight"
              aria-label="Traelogt"
            >
              <img
                src={logo}
                alt=""
                aria-hidden="true"
                className="h-8 w-auto object-contain"
              />

              <span>
                Trae<span className="text-accent">logt</span>
              </span>
            </Link>

            <Link
              to="/cart"
              className="ml-auto"
              aria-label={`${t("header.accessibility.shoppingBag")}${
                itemCount > 0 ? `, ${itemCount} items` : ""
              }`}
            >
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingBag />

                {itemCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold text-accent-foreground">
                    {itemCount > 99 ? "99+" : itemCount}
                  </span>
                )}
              </Button>
            </Link>
          </div>

          <form onSubmit={handleMobileSearchSubmit} className="pb-3">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                id="mobile-store-search"
                value={mobileSearch}
                onChange={(event) => setMobileSearch(event.target.value)}
                placeholder={t("header.search.mobilePlaceholder")}
                aria-label={t("header.accessibility.searchProducts")}
                className="h-11 rounded-full bg-muted/60 pl-10 pr-4"
              />
            </div>
          </form>
        </div>

        {/* Desktop header */}
        <div className="hidden h-16 items-center gap-4 md:flex">
          <Link
            to="/"
            className="flex shrink-0 items-center text-xl font-bold tracking-tight sm:text-2xl"
            aria-label="Traelogt"
          >
            <img
              src={logo}
              alt=""
              aria-hidden="true"
              className="h-9 w-auto object-contain sm:h-10"
            />

            <span>
              Trae<span className="text-accent">logt</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            <Link
              to="/products"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {t("header.navigation.shop")}
            </Link>

            <Link
              to="/categories"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {t("header.navigation.categories")}
            </Link>
          </nav>

          <form
            onSubmit={handleSearchSubmit}
            className="ml-auto flex max-w-md flex-1 lg:max-w-lg"
          >
            <div className="flex w-full items-center gap-2">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder={t("header.search.placeholder")}
                  aria-label={t("header.accessibility.searchProducts")}
                  className="h-10 rounded-full bg-muted/50 pl-9 pr-4"
                />
              </div>

              <Button
                type="submit"
                size="sm"
                className="h-10 gap-2 rounded-full px-4"
              >
                <Search />
                {t("header.search.button")}
              </Button>
            </div>
          </form>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <LanguageSwitcher />
          </div>

          <Link
            to="/cart"
            aria-label={`${t("header.accessibility.shoppingBag")}${
              itemCount > 0 ? `, ${itemCount} items` : ""
            }`}
          >
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingBag />

              {itemCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold text-accent-foreground">
                  {itemCount > 99 ? "99+" : itemCount}
                </span>
              )}
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default StoreHeader;
