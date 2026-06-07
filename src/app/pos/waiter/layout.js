"use client";

import RouteGuard from "@/components/auth/RouteGuard";

export default function WaiterLayout({ children }) {
  return <RouteGuard roles={["admin", "manager", "waiter"]}>{children}</RouteGuard>;
}