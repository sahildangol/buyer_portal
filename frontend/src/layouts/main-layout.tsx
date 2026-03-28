import { Heart, LayoutDashboard, LogOut } from "lucide-react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuthActions, useAuthUser } from "@/store/auth.store";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export const MainLayout = () => {
  const user = useAuthUser();
  const { logout } = useAuthActions();
  const navigate = useNavigate();
  const rawRole = user?.role?.trim().toUpperCase() || "BUYER";
  const roleLabel = rawRole.charAt(0) + rawRole.slice(1).toLowerCase();

  const handleLogout = () => {
    logout();
    toast.success("Logged out");
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-20 border-b bg-card/95 backdrop-blur">
        <div className="mx-auto w-full max-w-6xl px-4 py-3 sm:px-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="min-w-0">
              <h1 className="text-xl font-bold text-primary">BuyerPortal</h1>
              <p className="truncate text-xs text-muted-foreground sm:text-sm">
                Signed in as{" "}
                <span className="font-medium text-foreground">
                  {user?.name ?? "User"}
                </span>
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className={cn(
                  "rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-wide",
                  rawRole === "SELLER"
                    ? "border-amber-200 bg-amber-100 text-amber-800"
                    : "border-emerald-200 bg-emerald-100 text-emerald-800",
                )}
              >
                {roleLabel}
              </Badge>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4" aria-hidden />
                <span className="hidden md:inline">Logout</span>
                <span className="sr-only md:hidden">Logout</span>
              </Button>
            </div>
          </div>

          <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                cn(
                  "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground",
                )
              }
            >
              <LayoutDashboard className="h-4 w-4" aria-hidden />
              Dashboard
            </NavLink>
            <NavLink
              to="/favourites"
              className={({ isActive }) =>
                cn(
                  "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground",
                )
              }
            >
              <Heart className="h-4 w-4" aria-hidden />
              My Favourites
            </NavLink>
          </div>
        </div>
      </nav>
      <main className="mx-auto w-full max-w-6xl p-4 sm:p-6">
        <Outlet />
      </main>
    </div>
  );
};
