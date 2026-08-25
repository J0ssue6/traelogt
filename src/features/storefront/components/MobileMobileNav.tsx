import { Home, Menu, ShoppingBag, Store, Tags } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import { useCart } from "@/features/cart/cart-context";
import MobileMoreSheet from "./MobileMoreSheet";

function MobileBottomNav() {
  const { itemCount } = useCart();
  const location = useLocation();
  const { t } = useTranslation("storefront");
  const [moreOpen, setMoreOpen] = useState(false);

  const isHomeActive = location.pathname === "/";
  const isShopActive = location.pathname.startsWith("/products");
  const isCategoriesActive = location.pathname.startsWith("/categories");
  const isCartActive = location.pathname.startsWith("/cart");

  return (
    <>
      <nav
        className="fixed inset-x-0 bottom-0 z-50 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 md:hidden"
        aria-label="Mobile navigation"
      >
        <div className="mx-auto max-w-md pb-[env(safe-area-inset-bottom)]">
          <div className="grid h-16 grid-cols-5">
            <MobileNavItem
              to="/"
              icon={<Home className="size-5" />}
              label={t("header.navigation.home")}
              active={isHomeActive}
            />

            <MobileNavItem
              to="/products"
              icon={<Store className="size-5" />}
              label={t("header.navigation.shop")}
              active={isShopActive}
            />

            <MobileNavItem
              to="/categories"
              icon={<Tags className="size-5" />}
              label={t("header.navigation.categories")}
              active={isCategoriesActive}
            />

            <MobileNavItem
              to="/cart"
              icon={<ShoppingBag className="size-5" />}
              label={t("header.navigation.cart")}
              active={isCartActive}
              badge={itemCount}
            />

            <Button
              variant="ghost"
              className={[
                "flex h-full flex-col items-center justify-center gap-1 rounded-none text-xs font-medium",
                moreOpen
                  ? "text-accent"
                  : "text-muted-foreground hover:text-foreground",
              ].join(" ")}
              type="button"
              onClick={() => setMoreOpen(true)}
              aria-label="Open more menu"
              aria-expanded={moreOpen}
            >
              <Menu className="size-5" />
              <span>More</span>
            </Button>
          </div>
        </div>
      </nav>

      <MobileMoreSheet open={moreOpen} onOpenChange={setMoreOpen} />
    </>
  );
}

type MobileNavItemProps = {
  to: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  badge?: number;
};

function MobileNavItem({ to, icon, label, active, badge }: MobileNavItemProps) {
  return (
    <Link
      to={to}
      className={[
        "relative flex h-full flex-col items-center justify-center gap-1 text-xs font-medium transition-colors",
        active ? "text-accent" : "text-muted-foreground hover:text-foreground",
      ].join(" ")}
    >
      <span className="relative">
        {icon}

        {badge !== undefined && badge > 0 && (
          <span className="absolute -right-3 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[9px] font-bold text-accent-foreground">
            {badge > 99 ? "99+" : badge}
          </span>
        )}
      </span>

      <span>{label}</span>
    </Link>
  );
}

export default MobileBottomNav;
