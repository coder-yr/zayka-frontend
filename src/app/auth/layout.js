"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, ArrowLeft, ShieldCheck, Flame, Cpu, CloudLightning, HelpCircle } from "lucide-react";
import Link from "next/link";
import { useAuth, getRoleRedirectPath } from "@/context/AuthContext";

export default function AuthLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const { status, user } = useAuth();
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    if (status === "authenticated" && user) {
      router.replace(getRoleRedirectPath(user.role));
    }
  }, [router, status, user]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 text-zinc-500">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-rose-500 border-t-transparent animate-spin" />
          <span className="text-xs font-bold uppercase tracking-wider animate-pulse">Restoring session...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 md:p-8 overflow-hidden bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300 font-sans">
      
      {/* ─── Ambient Glow Blobs ─── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 40, -20, 0],
            y: [0, -30, 20, 0],
            scale: [1, 1.15, 0.9, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-rose-500/10 dark:bg-rose-500/15 blur-[100px] md:blur-[130px]"
        />
        <motion.div
          animate={{
            x: [0, -50, 30, 0],
            y: [0, 40, -30, 0],
            scale: [1, 0.9, 1.1, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-amber-500/10 dark:bg-amber-500/15 blur-[100px] md:blur-[130px]"
        />
        <motion.div
          animate={{
            x: [0, 30, -30, 0],
            y: [0, 30, 30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-[30%] right-[20%] w-[30%] h-[30%] rounded-full bg-emerald-500/5 dark:bg-emerald-500/10 blur-[80px]"
        />
      </div>

      {/* ─── Floating Header Controls ─── */}
      <header className="absolute top-0 inset-x-0 h-20 px-6 md:px-12 flex items-center justify-between z-55 pointer-events-auto">
        <Link
          href="/"
          className="group flex items-center gap-2 text-sm font-semibold text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Site</span>
        </Link>

        <div className="flex items-center gap-4">
          <span className="hidden sm:flex items-center gap-1 text-xs text-zinc-400 dark:text-zinc-500">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Support: 1800-ZAYKA-POS</span>
          </span>

          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl border border-zinc-200/80 bg-white/70 dark:border-zinc-800/80 dark:bg-zinc-900/60 backdrop-blur-md text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/70 hover:scale-105 active:scale-95 transition-all shadow-sm shadow-zinc-100/50 dark:shadow-none"
            aria-label="Toggle Theme"
          >
            {theme === "light" ? <Moon className="w-4.5 h-4.5" /> : <Sun className="w-4.5 h-4.5" />}
          </button>
        </div>
      </header>

      {/* ─── Main Glassmorphic Wrapper Card ─── */}
      <div className="w-full max-w-6xl min-h-[640px] md:min-h-[700px] grid grid-cols-1 lg:grid-cols-12 rounded-3xl overflow-hidden border border-zinc-200/50 bg-white/70 dark:border-zinc-800/50 dark:bg-zinc-900/40 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] z-10 transition-colors duration-300 mt-12 lg:mt-0">
        
        {/* Left Side: Brand Showcase Visual Pane (Hidden on mobile/tablet vertical) */}
        <div className="hidden lg:flex lg:col-span-5 relative flex-col justify-between p-10 overflow-hidden bg-zinc-950 border-r border-zinc-200/10">
          
          {/* Background image & overlay tint */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-luminosity"
            style={{ backgroundImage: `url('/images/zayka_auth_background.png')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-zinc-950/20 z-0" />
          <div className="absolute inset-0 bg-gradient-to-r from-rose-500/10 via-amber-500/5 to-transparent z-0 pointer-events-none" />

          {/* Logo Brand Header */}
          <div className="relative z-10 flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center shadow-lg shadow-rose-500/30">
              <Flame className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-lg font-black tracking-wider text-white uppercase block leading-none">
                ZAYKA
              </span>
              <span className="text-[10px] text-zinc-400 font-bold tracking-[0.2em] uppercase">
                Restaurant POS
              </span>
            </div>
          </div>

          {/* Marketing Copy and Value Propositions */}
          <div className="relative z-10 space-y-6 mt-auto mb-10">
            <h2 className="text-3xl font-extrabold text-white leading-tight tracking-tight">
              Premium Restaurant Tech <br />
              <span className="bg-gradient-to-r from-rose-400 via-pink-400 to-amber-400 text-transparent bg-clip-text">
                Crafted for Speed.
              </span>
            </h2>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-md">
              Streamline table service, kitchen workflow, billing, and multi-outlet analytics. Built with high performance and offline-first terminal synchronization.
            </p>

            {/* Feature Badges list */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-zinc-300 text-xs">
                <div className="w-7 h-7 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                </div>
                <span>Secured end-to-end sessions (AES-256)</span>
              </div>
              <div className="flex items-center gap-3 text-zinc-300 text-xs">
                <div className="w-7 h-7 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0">
                  <Cpu className="w-4 h-4 text-rose-400" />
                </div>
                <span>Zero-latency local network fallback mode</span>
              </div>
              <div className="flex items-center gap-3 text-zinc-300 text-xs">
                <div className="w-7 h-7 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0">
                  <CloudLightning className="w-4 h-4 text-amber-400" />
                </div>
                <span>Syncs live with KDS and waiter terminals</span>
              </div>
            </div>
          </div>

          {/* Footer Statistics */}
          <div className="relative z-10 pt-6 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-500 font-medium">
            <span>Server Uptime: 99.99%</span>
            <span>Version 2.4.0-Build</span>
          </div>
        </div>

        {/* Right Side: Authentication Forms (Enterprise/Terminal Form cards) */}
        <div className="col-span-1 lg:col-span-7 flex flex-col justify-center p-6 sm:p-10 md:p-14 relative">
          <div className="w-full max-w-md mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={pathname}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

      </div>
    </div>
  );
}
