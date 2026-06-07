"use client";

import React from "react";
import { useAuth } from "@/context/AuthContext";
import AdminDashboard from "@/components/dashboard/AdminDashboard";
import CashierDashboard from "@/components/dashboard/CashierDashboard";
import DeliveryDashboard from "@/components/dashboard/DeliveryDashboard";

export default function PosPage() {
  const { status, user } = useAuth();

  if (status === "loading") {
    return (
      <main className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="text-xs uppercase tracking-[0.3em] text-zinc-500">Zayka POS</div>
          <div className="text-2xl font-black">Restoring session...</div>
          <div className="text-sm text-zinc-400">Loading the signed-in staff session.</div>
        </div>
      </main>
    );
  }

  // Route based on role
  const role = user?.role || "cashier"; // Fallback

  switch (role) {
    case "admin":
    case "manager":
      return <AdminDashboard />;
    case "delivery_rider":
      return <DeliveryDashboard />;
    case "cashier":
    default:
      return <CashierDashboard />;
  }
}
