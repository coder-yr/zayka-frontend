"use client";

import React, { useState, useEffect } from "react";
import { LogOut, Wifi, WifiOff, Clock } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";

export default function KdsHeader({ activeTab, setActiveTab, stats }) {
  const { logout, user } = useAuth();
  const [currentTime, setCurrentTime] = useState("");
  const isOnline = true; // In real app, sync with context or navigator.onLine

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-30 flex h-20 w-full items-center justify-between border-b border-zinc-800 bg-zinc-950 px-6 shrink-0">
      
      {/* Left: Branding & User */}
      <div className="flex items-center gap-6">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">KDS <span className="text-primary">PRO</span></h1>
          <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 mt-0.5">{user?.name || "Kitchen Staff"}</p>
        </div>
        
        <div className="hidden md:flex items-center gap-2 bg-zinc-900 rounded-xl px-4 py-2 border border-zinc-800">
          <Clock className="h-4 w-4 text-zinc-400" />
          <span className="text-sm font-black text-white tracking-wider">{currentTime}</span>
        </div>
      </div>

      {/* Middle: Tabs */}
      <div className="flex bg-zinc-900 p-1 rounded-2xl border border-zinc-800">
        <button
          onClick={() => setActiveTab("active")}
          className={`relative px-8 py-3 text-sm font-black uppercase tracking-widest rounded-xl transition-colors z-10 ${
            activeTab === "active" ? "text-white" : "text-zinc-500 hover:text-zinc-300"
          }`}
        >
          {activeTab === "active" && (
            <motion.div
              layoutId="kdsTab"
              className="absolute inset-0 bg-zinc-800 rounded-xl -z-10 shadow-lg"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          Active ({stats.active})
        </button>
        <button
          onClick={() => setActiveTab("ready")}
          className={`relative px-8 py-3 text-sm font-black uppercase tracking-widest rounded-xl transition-colors z-10 ${
            activeTab === "ready" ? "text-white" : "text-zinc-500 hover:text-zinc-300"
          }`}
        >
          {activeTab === "ready" && (
            <motion.div
              layoutId="kdsTab"
              className="absolute inset-0 bg-green-500/20 border border-green-500/30 rounded-xl -z-10 shadow-lg"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          Ready ({stats.ready})
        </button>
      </div>

      {/* Right: Stats & Actions */}
      <div className="flex items-center gap-6">
        <div className="hidden lg:flex flex-col items-end">
          <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Avg Prep</span>
          <span className="text-lg font-black text-zinc-200">{stats.avgPrep}</span>
        </div>

        <div className="h-8 w-px bg-zinc-800" />

        <div className="flex items-center gap-4">
          <div className={`p-2 rounded-full ${isOnline ? "text-green-500 bg-green-500/10" : "text-red-500 bg-red-500/10"}`}>
            {isOnline ? <Wifi className="h-5 w-5" /> : <WifiOff className="h-5 w-5" />}
          </div>
          
          <button 
            onClick={() => logout()}
            className="flex items-center justify-center p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-red-400 hover:bg-red-500/10 hover:border-red-500/30 transition-colors"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
