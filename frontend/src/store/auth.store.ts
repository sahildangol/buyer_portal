import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { User } from "@/types/api.types";

type AuthState = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
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
      isAuthenticated: false,
      hasHydrated: false,
      actions: {
        setAuth: (user, token) => set({ user, token, isAuthenticated: true }),
        logout: () => set({ user: null, token: null, isAuthenticated: false }),
        setHasHydrated: (hasHydrated) => set({ hasHydrated }),
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        state?.actions.setHasHydrated(true);
      },
    },
  ),
);

export const useAuthUser = () => useAuthStore((state) => state.user);
export const useIsAuthenticated = () =>
  useAuthStore((state) => state.isAuthenticated);
export const useHasHydrated = () => useAuthStore((state) => state.hasHydrated);
export const useAuthActions = () => useAuthStore((state) => state.actions);

export const getAuthToken = () => useAuthStore.getState().token;
export const forceLogout = () => useAuthStore.getState().actions.logout();
