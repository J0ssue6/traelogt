import { Outlet } from "react-router-dom";

import StoreHeader from "@/features/storefront/components/StoreHeader";
import StoreFooter from "@/features/storefront/components/StoreFooter";

function StorefrontLayout() {
  return (
    <div className="min-h-screen bg-background">
      <StoreHeader />

      <main>
        <Outlet />
      </main>

      <StoreFooter />
    </div>
  );
}

export default StorefrontLayout;
