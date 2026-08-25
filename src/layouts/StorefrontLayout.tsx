import { Outlet } from "react-router-dom";

import StoreHeader from "@/features/storefront/components/StoreHeader";
import StoreFooter from "@/features/storefront/components/StoreFooter";
import MobileBottomNav from "@/features/storefront/components/MobileMobileNav";

function StorefrontLayout() {
  return (
    <div className="min-h-screen bg-background">
      <StoreHeader />

      <main className="pb-20 md:pb-0">
        <Outlet />
      </main>

      <StoreFooter />

      <MobileBottomNav />
    </div>
  );
}

export default StorefrontLayout;
