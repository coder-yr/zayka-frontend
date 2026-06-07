"use client";

import RouteGuard from "@/components/auth/RouteGuard";

const ALLOWED_ROLES = ["admin", "manager", "cashier", "waiter", "kitchen", "delivery_rider"];

export default function PosLayout({ children }) {
  return <RouteGuard roles={ALLOWED_ROLES}>{children}</RouteGuard>;
}