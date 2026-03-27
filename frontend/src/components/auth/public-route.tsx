import { Navigate, Outlet } from "react-router-dom";
import { useHasHydrated, useIsAuthenticated } from "@/store/auth.store";

export const PublicRoute = () => {
  const isHydrated = useHasHydrated();
  const isAuthenticated = useIsAuthenticated();

  if (!isHydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-muted-foreground">
        Loading session...
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
