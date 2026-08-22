import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/features/auth/auth-context";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

function ProtectedAdminRoute() {
  const { user, loading: authLoading } = useAuth();
  const location = useLocation();

  const [checkingAdmin, setCheckingAdmin] = useState(true);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function checkAdmin() {
      setCheckingAdmin(true);

      try {
        /*
         * Explicitly ask Supabase for the current session.
         * This protects us from a brief auth-context race during
         * a full browser refresh.
         */
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (cancelled) return;

        if (sessionError) {
          console.error("Session check failed:", sessionError);
          setIsAdmin(false);
          return;
        }

        if (!session) {
          setIsAdmin(false);
          return;
        }

        const { data, error } = await supabase.rpc("is_current_user_admin");

        if (cancelled) return;

        if (error) {
          console.error("Admin check failed:", error);
          setIsAdmin(false);
          return;
        }

        console.log("Admin check result:", data);

        setIsAdmin(data === true);
      } finally {
        if (!cancelled) {
          setCheckingAdmin(false);
        }
      }
    }

    if (!authLoading) {
      checkAdmin();
    }

    return () => {
      cancelled = true;
    };
  }, [authLoading]);

  /*
   * Never redirect while either authentication or admin
   * verification is still being resolved.
   */
  if (authLoading || checkingAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Checking admin access...
      </div>
    );
  }

  /*
   * At this point Supabase has explicitly told us whether
   * a session exists.
   */
  if (!user) {
    return (
      <Navigate to="/admin/login" replace state={{ from: location.pathname }} />
    );
  }

  if (isAdmin !== true) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedAdminRoute;
