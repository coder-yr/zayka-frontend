"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth, getRoleRedirectPath, normalizeRole } from "@/context/AuthContext";

export default function RouteGuard({ children, roles = [], fallbackPath = "/auth/login" }) {
  const router = useRouter();
  const pathname = usePathname();
  const { status, user } = useAuth();

  useEffect(() => {
    if (status === "loading") return;

    if (!user) {
      router.replace(fallbackPath);
      return;
    }

    const requiredRoles = roles.map(normalizeRole).filter(Boolean);
    if (requiredRoles.length > 0 && !requiredRoles.includes(normalizeRole(user.role))) {
      router.replace(getRoleRedirectPath(user.role));
      return;
    }

    if (pathname === "/auth/session-expired" && user) {
      router.replace(getRoleRedirectPath(user.role));
    }
  }, [fallbackPath, pathname, roles, router, status, user]);

  if (status === "loading") {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-sm text-zinc-500 dark:text-zinc-400">
        Restoring session...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-sm text-zinc-500 dark:text-zinc-400">
        Redirecting to authentication...
      </div>
    );
  }

  const requiredRoles = roles.map(normalizeRole).filter(Boolean);
  if (requiredRoles.length > 0 && !requiredRoles.includes(normalizeRole(user.role))) {
    return null;
  }

  return children;
}