"use client";

import React from "react";
import { Bell, Menu, Wifi, WifiOff } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function TopNav({ setIsSidebarOpen, title = "Dashboard", isOnline = true }) {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-zinc-800/50 bg-zinc-950/80 px-4 backdrop-blur-md sm:px-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="rounded-xl p-2 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100 lg:hidden"
        >
          <Menu className="h-6 w-6" />
        </button>
        <h1 className="text-xl font-bold tracking-tight text-zinc-100">{title}</h1>
      </div>

      <div className="flex items-center gap-3 sm:gap-5">
        <div
          className={`hidden sm:flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${
            isOnline ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"
          }`}
        >
          {isOnline ? <Wifi className="h-3 w-3" /> : <WifiOff className="h-3 w-3" />}
          {isOnline ? "Online" : "Offline"}
        </div>

        <button className="relative rounded-xl p-2 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100 transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary ring-2 ring-zinc-950" />
        </button>

        <div className="hidden sm:block h-8 w-px bg-zinc-800" />

        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primaryLight text-sm font-bold text-white shadow-lg shadow-primary/20">
            {user?.name?.charAt(0) || "U"}
          </div>
        </div>
      </div>
    </header>
  );
}
