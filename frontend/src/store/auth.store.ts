import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { queryClient } from "@/lib/query-client";
import type { User } from "@/types/api.types";

type AuthState = {
  user: User | null;
  token: string | null;
  hasHydrated: boolean;
  actions: {
    setAuth: (user: User, token: string) => void;
    logout: () => void;
    setHasHydrated: (hasHydrated: boolean) => void;
  };
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      hasHydrated: false,
      actions: {
        setAuth: (user, token) => {
          queryClient.clear();
          set({ user, token });
        },
        logout: () => {
          queryClient.clear();
          set({ user: null, token: null });
        },
        setHasHydrated: (hasHydrated) => set({ hasHydrated }),
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
      }),
      onRehydrateStorage: () => (state) => {
        state?.actions.setHasHydrated(true);
      },
    },
  ),
);

export const useAuthUser = () => useAuthStore((state) => state.user);
export const useIsAuthenticated = () =>
  useAuthStore((state) => Boolean(state.token));
export const useHasHydrated = () => useAuthStore((state) => state.hasHydrated);
export const useAuthActions = () => useAuthStore((state) => state.actions);

export const getAuthToken = () => useAuthStore.getState().token;
export const forceLogout = () => useAuthStore.getState().actions.logout();
