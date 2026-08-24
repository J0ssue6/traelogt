import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ArrowLeft, Menu } from "lucide-react";

import { useAuth } from "@/features/auth/auth-context";

const navigation = [
  { name: "Dashboard", path: "/admin" },
  { name: "Products", path: "/admin/products" },
  { name: "Categories", path: "/admin/categories" },
  { name: "Orders", path: "/admin/orders" },
];

function AdminNavigation({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav className="flex-1 space-y-1">
      {navigation.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          end={item.path === "/admin"}
          onClick={onNavigate}
          className={({ isActive }) =>
            `block rounded-md px-3 py-2 text-sm ${
              isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted"
            }`
          }
        >
          {item.name}
        </NavLink>
      ))}
    </nav>
  );
}

function AdminLayout() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  async function handleSignOut() {
    await signOut();
    navigate("/admin/login", { replace: true });
  }

  function closeMobileMenu() {
    setMobileMenuOpen(false);
  }

  function handleBack() {
    navigate(-1);
  }

  return (
    <TooltipProvider>
      <div className="flex h-screen overflow-hidden">
        {/* Desktop Sidebar */}
        <aside className="hidden w-64 shrink-0 flex-col border-r bg-muted/30 p-6 md:flex">
          <div className="mb-8 text-xl font-bold">Traelogt</div>

          <AdminNavigation />

          <div className="border-t pt-5">
            <p className="mb-3 truncate text-xs text-muted-foreground">
              {user?.email}
            </p>

            <Button
              variant="outline"
              className="w-full"
              onClick={handleSignOut}
            >
              Sign out
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Mobile Header */}
          <header className="sticky top-0 z-40 flex h-14 shrink-0 items-center border-b bg-background/95 px-4 backdrop-blur md:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger
                aria-label="Open navigation"
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Menu className="size-5" />
              </SheetTrigger>

              <SheetContent side="left" className="flex w-72 flex-col p-6">
                <SheetHeader className="mb-8 text-left">
                  <SheetTitle>Traelogt</SheetTitle>
                </SheetHeader>

                <AdminNavigation onNavigate={closeMobileMenu} />

                <div className="border-t pt-5">
                  <p className="mb-3 truncate text-xs text-muted-foreground">
                    {user?.email}
                  </p>

                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleSignOut}
                  >
                    Sign out
                  </Button>
                </div>
              </SheetContent>
            </Sheet>

            <span className="ml-2 min-w-0 truncate text-lg font-semibold">
              Traelogt
            </span>

            {/* Back button */}
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="ml-auto shrink-0 gap-2"
              onClick={handleBack}
              aria-label="Go back"
            >
              <ArrowLeft className="size-4" />
              <span className="hidden xs:inline">Back</span>
            </Button>
          </header>

          {/* Page Content */}
          <main className="min-w-0 flex-1 overflow-y-auto p-4 md:p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}

export default AdminLayout;
