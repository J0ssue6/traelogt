import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

import { useAuth } from "@/features/auth/auth-context";

const navigation = [
  { name: "Dashboard", path: "/admin" },
  { name: "Products", path: "/admin/products" },
  { name: "Categories", path: "/admin/categories" },
  { name: "Orders", path: "/admin/orders" },
];

function AdminLayout() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  async function handleSignOut() {
    await signOut();
    navigate("/admin/login", { replace: true });
  }

  return (
    <TooltipProvider>
      <div className="flex h-screen overflow-hidden">
        <aside className="flex w-64 shrink-0 flex-col border-r bg-muted/30 p-6">
          <div className="mb-8 text-xl font-bold">Traelogt</div>

          <nav className="flex-1 space-y-1">
            {navigation.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/admin"}
                className={({ isActive }) =>
                  `block rounded-md px-3 py-2 text-sm ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

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

        <main className="min-w-0 flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </TooltipProvider>
  );
}

export default AdminLayout;
