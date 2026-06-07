"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight, Eye, EyeOff, Lock, Mail, ShieldAlert } from "lucide-react";
import { useAuth, getRoleRedirectPath } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login, status } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const result = await login(email, password);
      const nextRoute = getRoleRedirectPath(result?.user?.role);
      setSuccessMsg(`Welcome back, ${result?.user?.name || "team member"}. Redirecting...`);
      setTimeout(() => {
        router.replace(nextRoute);
      }, 700);
    } catch (error) {
      const message = error?.response?.data?.message || error?.message || "Unable to sign in. Please try again.";
      setErrorMsg(message);
    } finally {
      setIsLoading(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-sm text-zinc-500 dark:text-zinc-400">
        Restoring session...
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-md mx-auto">
      <div className="space-y-1">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 text-rose-500 text-[10px] font-black uppercase tracking-[0.28em] border border-rose-500/20">
          <span>Secure Access</span>
        </div>
        <h1 className="text-3xl font-extrabold text-zinc-950 dark:text-white tracking-tight">
          Sign in to Zayka POS
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm">
          Use your restaurant account. Session cookies and automatic refresh are handled for you.
        </p>
      </div>

      {errorMsg && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 rounded-xl border border-rose-200 bg-rose-50/70 dark:border-rose-900/30 dark:bg-rose-950/20 text-xs font-semibold text-rose-600 dark:text-rose-400 flex items-center gap-2"
        >
          <ShieldAlert className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </motion.div>
      )}

      {successMsg && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 rounded-xl border border-emerald-200 bg-emerald-50/70 dark:border-emerald-900/30 dark:bg-emerald-950/20 text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-2"
        >
          <span>{successMsg}</span>
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1">
          <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400">Email address</label>
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@zayka.com"
              className="w-full pl-10 pr-4 py-3 text-sm rounded-xl border border-zinc-200 bg-white/40 dark:border-zinc-800 dark:bg-zinc-950/40 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all font-medium"
              required
            />
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 dark:text-zinc-500" />
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400">Password</label>
            <Link
              href="/auth/forgot-password"
              className="text-xs text-rose-500 hover:text-rose-600 dark:text-rose-400 dark:hover:text-rose-300 font-bold transition-colors"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-10 pr-10 py-3 text-sm rounded-xl border border-zinc-200 bg-white/40 dark:border-zinc-800 dark:bg-zinc-950/40 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all font-medium"
              required
            />
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 dark:text-zinc-500" />
            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 shadow-md shadow-rose-500/20 hover:shadow-lg hover:shadow-rose-500/30 transition-all active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none"
        >
          {isLoading ? (
            <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
          ) : (
            <>
              <span>Sign in</span>
              <ChevronRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      <div className="pt-4 border-t border-zinc-200/50 dark:border-zinc-800/50 text-center text-xs text-zinc-500">
        <span>Need to register a new restaurant location?</span>{" "}
        <Link
          href="/auth/register"
          className="text-rose-500 hover:text-rose-600 dark:text-rose-400 dark:hover:text-rose-300 font-bold transition-colors underline"
        >
          Register outlet
        </Link>
      </div>
    </div>
  );
}
