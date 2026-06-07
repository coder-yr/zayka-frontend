"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  UtensilsCrossed,
  BarChart3,
  Settings,
  ShoppingCart,
  ClipboardList,
  Clock,
  MapPin,
  Wallet,
  LogOut,
  Menu,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const ROLE_NAV_LINKS = {
  admin: [
    { name: "Dashboard", href: "/pos", icon: LayoutDashboard },
    { name: "Menu Management", href: "/pos/menu", icon: UtensilsCrossed },
    { name: "Staff & Users", href: "/pos/users", icon: Users },
    { name: "Analytics", href: "/pos/analytics", icon: BarChart3 },
    { name: "Settings", href: "/pos/settings", icon: Settings },
  ],
  manager: [
    { name: "Dashboard", href: "/pos", icon: LayoutDashboard },
    { name: "Orders", href: "/pos/orders", icon: ShoppingCart },
    { name: "Menu", href: "/pos/menu", icon: UtensilsCrossed },
    { name: "Staff", href: "/pos/staff", icon: Users },
  ],
  cashier: [
    { name: "Checkout", href: "/pos", icon: ShoppingCart },
    { name: "Order History", href: "/pos/orders", icon: ClipboardList },
    { name: "Shift Details", href: "/pos/shift", icon: Clock },
  ],
  waiter: [
    { name: "Tables", href: "/pos", icon: LayoutDashboard },
    { name: "Active Orders", href: "/pos/waiter/orders", icon: ClipboardList },
    { name: "Menu", href: "/pos/waiter/menu", icon: UtensilsCrossed },
  ],
  kitchen: [
    { name: "Active Tickets", href: "/pos", icon: ClipboardList },
    { name: "Prep Timers", href: "/pos/kitchen/timers", icon: Clock },
    { name: "Inventory", href: "/pos/kitchen/inventory", icon: UtensilsCrossed },
  ],
  delivery_rider: [
    { name: "Deliveries", href: "/pos", icon: MapPin },
    { name: "History", href: "/pos/delivery/history", icon: ClipboardList },
    { name: "Earnings", href: "/pos/delivery/earnings", icon: Wallet },
  ],
};

export default function Sidebar({ isOpen, setIsOpen }) {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  const navLinks = useMemo(() => {
    if (!user?.role) return ROLE_NAV_LINKS.cashier; // Default fallback
    return ROLE_NAV_LINKS[user.role] || ROLE_NAV_LINKS.cashier;
  }, [user?.role]);

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar */}
      <motion.aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform flex-col justify-between border-r border-zinc-800 bg-zinc-950/95 backdrop-blur-xl lg:static lg:flex lg:translate-x-0 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } flex`}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex h-16 shrink-0 items-center px-6 border-b border-zinc-800/50">
            <Link href="/pos" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary">
                <UtensilsCrossed className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-black tracking-tight text-zinc-100">Zayka POS</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100"
                  }`}
                >
                  <Icon
                    className={`h-5 w-5 ${
                      isActive ? "text-primary" : "text-zinc-500 group-hover:text-zinc-300"
                    }`}
                  />
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="active-nav"
                      className="absolute left-0 h-8 w-1 rounded-r-full bg-primary"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* User & Logout section */}
          <div className="border-t border-zinc-800/50 p-4">
            <div className="mb-4 flex items-center gap-3 rounded-xl bg-zinc-900/50 px-3 py-3 border border-zinc-800/50">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-800 text-zinc-100 font-bold uppercase">
                {user?.name?.charAt(0) || "U"}
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="truncate text-sm font-semibold text-zinc-100">
                  {user?.name || "Staff Member"}
                </span>
                <span className="truncate text-xs font-medium uppercase tracking-wider text-zinc-500">
                  {user?.role || "Role"}
                </span>
              </div>
            </div>
            <button
              onClick={() => logout()}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
            >
              <LogOut className="h-5 w-5" />
              Sign Out
            </button>
          </div>
        </div>
      </motion.aside>
    </>
  );
}
