"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Building, CheckCircle2, Lock, Mail, ShieldAlert, User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [restaurantName, setRestaurantName] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!agreeTerms) {
      setErrorMsg("You must agree to the Terms of Service and Privacy Policy.");
      return;
    }

    setIsLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      await register({ name, email, password, restaurantName });
      setSuccessMsg("Registration request submitted. Redirecting to login...");
      setTimeout(() => router.push("/auth/login"), 1400);
    } catch (error) {
      const message = error?.response?.data?.message || error?.message || "Registration failed.";
      setErrorMsg(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-md mx-auto">
      <Link
        href="/auth/login"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Return to Login</span>
      </Link>

      <div className="space-y-1">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 text-rose-500 text-[10px] font-black uppercase tracking-[0.28em] border border-rose-500/20">
          <span>Outlet Setup</span>
        </div>
        <h1 className="text-3xl font-extrabold text-zinc-950 dark:text-white tracking-tight">Register outlet</h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm">
          Create the first workspace account for your restaurant location.
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
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{successMsg}</span>
        </motion.div>
      )}

      <form onSubmit={handleRegister} className="space-y-4">
        <div className="space-y-1">
          <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400">Restaurant name</label>
          <div className="relative">
            <input
              type="text"
              value={restaurantName}
              onChange={(e) => setRestaurantName(e.target.value)}
              placeholder="e.g. Zayka Bistro & Lounge"
              className="w-full pl-10 pr-4 py-3 text-sm rounded-xl border border-zinc-200 bg-white/40 dark:border-zinc-800 dark:bg-zinc-950/40 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all font-medium"
              required
            />
            <Building className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 dark:text-zinc-500" />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400">Administrator name</label>
          <div className="relative">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Yash Vardhan"
              className="w-full pl-10 pr-4 py-3 text-sm rounded-xl border border-zinc-200 bg-white/40 dark:border-zinc-800 dark:bg-zinc-950/40 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all font-medium"
              required
            />
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 dark:text-zinc-500" />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400">Business email</label>
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="billing@restaurant.com"
              className="w-full pl-10 pr-4 py-3 text-sm rounded-xl border border-zinc-200 bg-white/40 dark:border-zinc-800 dark:bg-zinc-950/40 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all font-medium"
              required
            />
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 dark:text-zinc-500" />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400">Security password</label>
          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 8 characters"
              className="w-full pl-10 pr-4 py-3 text-sm rounded-xl border border-zinc-200 bg-white/40 dark:border-zinc-800 dark:bg-zinc-950/40 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all font-medium"
              minLength={8}
              required
            />
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 dark:text-zinc-500" />
          </div>
        </div>

        <div className="py-1">
          <label className="flex items-start gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="w-4.5 h-4.5 mt-0.5 rounded border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-rose-500 focus:ring-rose-500/20 focus:ring-offset-0"
            />
            <span className="text-xs text-zinc-500 dark:text-zinc-400 select-none leading-normal">
              I agree to the Zayka POS Terms of Service and acknowledge the Privacy Policy.
            </span>
          </label>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 shadow-md shadow-rose-500/20 hover:shadow-lg hover:shadow-rose-500/30 transition-all active:scale-[0.99] disabled:opacity-50"
        >
          {isLoading ? (
            <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
          ) : (
            <>
              <span>Initialize workspace</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
