import { type FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import apiClient from "@/api/api.client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginSchema } from "@/schemas/auth.schema";
import { useAuthActions } from "@/store/auth.store";
import type { LoginInput } from "@/types/api.types";

const getErrorMessage = (error: unknown) =>
  error instanceof Error ? error.message : "Something went wrong";

export const LoginPage = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuthActions();

  const [formValues, setFormValues] = useState<LoginInput>({
    email: "",
    password: "",
  });
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof LoginInput, string>>
  >({});

  const loginMutation = useMutation({
    mutationFn: apiClient.login,
    onSuccess: (result) => {
      setAuth(result.user, result.token);
      setSubmitError(null);
      toast.success("Logged in successfully");
      navigate("/", { replace: true });
    },
    onError: (error) => {
      const message = getErrorMessage(error);
      setSubmitError(message);
      toast.error(message);
    },
  });

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsed = loginSchema.safeParse(formValues);

    if (!parsed.success) {
      const issues = parsed.error.flatten().fieldErrors;
      setFieldErrors({
        email: issues.email?.[0],
        password: issues.password?.[0],
      });
      setSubmitError(null);
      return;
    }

    setFieldErrors({});
    setSubmitError(null);
    loginMutation.mutate(parsed.data);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-background to-muted/30 p-4">
      <Card className="w-full max-w-md border-border">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>
            Login to access your properties and favourites.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={formValues.email}
                disabled={loginMutation.isPending}
                onChange={(event) =>
                  setFormValues((prev) => ({ ...prev, email: event.target.value }))
                }
              />
              {fieldErrors.email ? (
                <p className="text-xs text-destructive">{fieldErrors.email}</p>
              ) : null}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                value={formValues.password}
                disabled={loginMutation.isPending}
                onChange={(event) =>
                  setFormValues((prev) => ({ ...prev, password: event.target.value }))
                }
              />
              {fieldErrors.password ? (
                <p className="text-xs text-destructive">{fieldErrors.password}</p>
              ) : null}
            </div>

            <Button type="submit" className="w-full" disabled={loginMutation.isPending}>
              {loginMutation.isPending ? "Signing in..." : "Sign In"}
            </Button>
            {submitError ? (
              <p className="text-sm text-destructive" role="alert">
                {submitError}
              </p>
            ) : null}
          </form>

          <p className="mt-4 text-sm text-muted-foreground">
            New here?{" "}
            <Link to="/register" className="font-medium text-primary hover:underline">
              Create an account
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
