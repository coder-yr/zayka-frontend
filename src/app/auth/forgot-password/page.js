import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";

export default function ForgotPasswordPage() {
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
          <Mail className="w-3.5 h-3.5" />
          <span>Recovery</span>
        </div>
        <h1 className="text-3xl font-extrabold text-zinc-950 dark:text-white tracking-tight">Password recovery</h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm">
          Password recovery is not enabled in this frontend flow. Sign in again or ask your administrator to restore access.
        </p>
      </div>
    </div>
  );
}
