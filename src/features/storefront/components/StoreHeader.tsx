import { Menu, Search, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { useCart } from "@/features/cart/cart-context";

function StoreHeader() {
  const { itemCount } = useCart();
  const navigate = useNavigate();

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
        <div className="flex h-16 items-center gap-4">
          {/* Mobile menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger
                render={
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Open navigation menu"
                  />
                }
              >
                <Menu />
              </SheetTrigger>

              <SheetContent side="left" className="w-[85%] sm:max-w-sm">
                <SheetHeader className="border-b px-6 py-5">
                  <SheetTitle className="text-left text-xl font-bold">
                    Trae<span className="text-accent">logt</span>
                  </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col px-6 py-6">
                  <nav className="flex flex-col">
                    <SheetClose
                      render={
                        <Link
                          to="/"
                          className="border-b py-4 text-base font-medium"
                        />
                      }
                    >
                      Home
                    </SheetClose>

                    <SheetClose
                      render={
                        <Link
                          to="/products"
                          className="border-b py-4 text-base font-medium"
                        />
                      }
                    >
                      Shop
                    </SheetClose>

                    <SheetClose
                      render={
                        <Link
                          to="/categories"
                          className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                        >
                          Categories
                        </Link>
                      }
                    >
                      Categories
                    </SheetClose>

                    <SheetClose
                      render={
                        <Link
                          to="/cart"
                          className="flex items-center justify-between border-b py-4 text-base font-medium"
                        />
                      }
                    >
                      <span>Cart</span>

                      {itemCount > 0 && (
                        <span className="rounded-full bg-accent px-2 py-0.5 text-xs font-bold text-accent-foreground">
                          {itemCount}
                        </span>
                      )}
                    </SheetClose>
                  </nav>

                  <form onSubmit={handleMobileSearchSubmit} className="mt-8">
                    <label
                      htmlFor="mobile-store-search"
                      className="mb-2 block text-sm font-medium"
                    >
                      Search products
                    </label>

                    <div className="flex gap-2">
                      <Input
                        id="mobile-store-search"
                        value={mobileSearch}
                        onChange={(event) =>
                          setMobileSearch(event.target.value)
                        }
                        placeholder="What are you looking for?"
                      />

                      <SheetClose
                        render={
                          <Button
                            type="submit"
                            size="icon"
                            aria-label="Search products"
                          />
                        }
                      >
                        <Search />
                      </SheetClose>
                    </div>
                  </form>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Logo */}
          <Link
            to="/"
            className="shrink-0 text-xl font-bold tracking-tight sm:text-2xl"
          >
            Trae<span className="text-accent">logt</span>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden items-center gap-7 md:flex">
            <Link
              to="/products"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Shop
            </Link>

            <Link
              to="/categories"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Categories
            </Link>
          </nav>

          {/* Desktop search */}
          <form
            onSubmit={handleSearchSubmit}
            className="ml-auto hidden max-w-md flex-1 md:block lg:max-w-lg"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search products..."
                aria-label="Search products"
                className="h-10 rounded-full bg-muted/50 pl-9 pr-4"
              />
            </div>
          </form>

          {/* Mobile search */}
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto md:hidden"
            aria-label="Search products"
            onClick={() => navigate("/products")}
          >
            <Search />
          </Button>

          {/* Cart */}
          <Link
            to="/cart"
            aria-label={`Shopping bag${
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
