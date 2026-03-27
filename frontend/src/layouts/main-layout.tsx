import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuthActions, useAuthUser } from "@/store/auth.store";
import { toast } from "sonner";

export const MainLayout = () => {
  const user = useAuthUser();
  const { logout } = useAuthActions();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logged out");
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="flex items-center justify-between border-b bg-card px-6 py-4">
        <div className="flex items-center gap-6">
          <h1 className="text-xl font-bold text-primary">BuyerPortal</h1>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `text-sm transition-colors ${
                isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`
            }
          >
            Dashboard
          </NavLink>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">
            Welcome, {user?.name ?? "User"}
          </span>
          <Badge variant="outline">{user?.role ?? "BUYER"}</Badge>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </nav>
      <main className="container mx-auto p-6">
        <Outlet />
      </main>
    </div>
  );
};
