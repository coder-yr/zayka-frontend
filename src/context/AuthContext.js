"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { authService } from "@/lib/api";

const AuthContext = createContext(null);

const ROLE_REDIRECTS = {
  admin: "/pos",
  manager: "/pos",
  cashier: "/pos",
  waiter: "/pos/waiter",
  kitchen: "/pos/kitchen",
  delivery_rider: "/pos",
};

function normalizeRole(role) {
  const normalized = String(role || "").trim().toLowerCase();
  return normalized === "staff" ? "waiter" : normalized;
}

function getRoleRedirectPath(role) {
  return ROLE_REDIRECTS[normalizeRole(role)] || "/pos";
}

export function AuthProvider({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [status, setStatus] = useState("loading");
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [error, setError] = useState(null);

  const syncSession = useCallback((payload) => {
    const nextUser = payload?.user || null;
    setUser(nextUser);
    setSession(payload || null);
    setStatus(nextUser ? "authenticated" : "unauthenticated");
    setError(null);
    return payload;
  }, []);

  const restoreSession = useCallback(async () => {
    setStatus((current) => (current === "authenticated" ? current : "loading"));
    try {
      const response = await authService.getSession();
      const payload = response?.data || response;
      if (payload?.authenticated && payload?.user) {
        return syncSession(payload);
      }
      setUser(null);
      setSession(null);
      setStatus("unauthenticated");
      return null;
    } catch (restoreError) {
      setUser(null);
      setSession(null);
      setStatus("unauthenticated");
      setError(restoreError);
      return null;
    }
  }, [syncSession]);

  useEffect(() => {
    restoreSession();
  }, [restoreSession]);

  useEffect(() => {
    const handleSessionExpired = () => {
      setUser(null);
      setSession(null);
      setStatus("unauthenticated");
      if (!pathname.startsWith("/auth")) {
        router.replace("/auth/session-expired");
      }
    };

    const handleAuthSuccess = (event) => {
      if (event?.detail?.user) {
        syncSession(event.detail);
      }
    };

    window.addEventListener("zayka:session-expired", handleSessionExpired);
    window.addEventListener("zayka:auth-success", handleAuthSuccess);

    return () => {
      window.removeEventListener("zayka:session-expired", handleSessionExpired);
      window.removeEventListener("zayka:auth-success", handleAuthSuccess);
    };
  }, [pathname, router, syncSession]);

  const login = useCallback(
    async (email, password) => {
      const response = await authService.login(email, password);
      const payload = response?.data || response;
      if (!payload?.user) {
        throw new Error("Login response did not include a user profile");
      }

      syncSession(payload);
      window.dispatchEvent(new CustomEvent("zayka:auth-success", { detail: payload }));
      return payload;
    },
    [syncSession]
  );

  const register = useCallback(async (data) => {
    const response = await authService.register(data);
    return response?.data || response;
  }, []);

  const logout = useCallback(
    async ({ allSessions = false } = {}) => {
      if (allSessions) {
        await authService.logoutAll();
      } else {
        await authService.logout();
      }

      setUser(null);
      setSession(null);
      setStatus("unauthenticated");
      router.replace("/auth/login");
    },
    [router]
  );

  const value = useMemo(
    () => ({
      status,
      user,
      session,
      error,
      login,
      logout,
      register,
      restoreSession,
      getRoleRedirectPath,
      normalizeRole,
    }),
    [error, getRoleRedirectPath, login, logout, register, restoreSession, session, status, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export { ROLE_REDIRECTS, getRoleRedirectPath, normalizeRole };