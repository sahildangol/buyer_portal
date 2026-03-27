import { Navigate, Outlet } from "react-router-dom";
import { useHasHydrated, useIsAuthenticated } from "@/store/auth.store";

export const ProtectedRoute = () => {
  const hasHydrated = useHasHydrated();
  const isAuthenticated = useIsAuthenticated();

  if (!hasHydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-muted-foreground">
        Loading session...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
