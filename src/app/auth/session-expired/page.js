"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, LogOut, RefreshCcw, ShieldAlert } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function SessionExpiredPage() {
  const { user, restoreSession, logout, getRoleRedirectPath } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleRestore = async () => {
    setIsLoading(true);
    setErrorMsg("");
    setMessage("");

    try {
      const result = await restoreSession();
      if (result?.user) {
        setMessage("Session restored. Redirecting...");
        window.location.href = getRoleRedirectPath(result.user.role);
        return;
      }
      setErrorMsg("No active session was found. Please sign in again.");
    } catch (error) {
      setErrorMsg(error?.response?.data?.message || error?.message || "Unable to restore session.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await logout();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-md mx-auto">
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-500">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold text-zinc-950 dark:text-white tracking-tight">Session expired</h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm">
            Your access token has expired. Restore your session or sign in again.
          </p>
        </div>
      </div>

      {message && (
        <div className="p-3 rounded-xl border border-emerald-200 bg-emerald-50/70 dark:border-emerald-900/30 dark:bg-emerald-950/20 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
          {message}
        </div>
      )}

      {errorMsg && (
        <div className="p-3 rounded-xl border border-rose-200 bg-rose-50/70 dark:border-rose-900/30 dark:bg-rose-950/20 text-xs font-semibold text-rose-600 dark:text-rose-400">
          {errorMsg}
        </div>
      )}

      {user && (
        <div className="p-4 rounded-2xl bg-zinc-100/50 dark:bg-zinc-800/20 border border-zinc-200/20 space-y-2">
          <div className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Current user</div>
          <div className="text-sm font-black text-zinc-900 dark:text-zinc-100">{user.name}</div>
          <div className="text-xs text-zinc-500 dark:text-zinc-400">{user.email}</div>
          <div className="text-[10px] uppercase tracking-wider text-rose-500 font-bold">Role: {user.role}</div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          type="button"
          onClick={handleRestore}
          disabled={isLoading}
          className="flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 shadow-md shadow-rose-500/20 transition-all active:scale-[0.99] disabled:opacity-50"
        >
          {isLoading ? (
            <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
          ) : (
            <>
              <RefreshCcw className="w-4 h-4" />
              <span>Restore session</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={handleLogout}
          disabled={isLoading}
          className="flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-rose-500 border border-rose-500/20 hover:bg-rose-500/10 transition-colors disabled:opacity-50"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign out</span>
        </button>
      </div>

      <div className="text-center text-xs text-zinc-500 dark:text-zinc-400">
        If session restore fails, you will be redirected to login.
      </div>
    </div>
  );
}
