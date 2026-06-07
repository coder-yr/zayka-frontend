"use client";

import RouteGuard from "@/components/auth/RouteGuard";

export default function KitchenLayout({ children }) {
  return <RouteGuard roles={["admin", "manager", "kitchen"]}>{children}</RouteGuard>;
}