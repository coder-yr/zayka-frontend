import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";

export default function OtpPage() {
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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase tracking-[0.28em] border border-emerald-500/20">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Security Notice</span>
        </div>
        <h1 className="text-3xl font-extrabold text-zinc-950 dark:text-white tracking-tight">OTP verification</h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm">
          One-time code recovery is not enabled in this build. Use the standard login flow or restore your session.
        </p>
      </div>
    </div>
  );
}
