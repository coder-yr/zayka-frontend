import Link from "next/link";
import { ArrowLeft, Lock } from "lucide-react";

export default function ResetPasswordPage() {
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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 text-[10px] font-black uppercase tracking-[0.28em] border border-amber-500/20">
          <Lock className="w-3.5 h-3.5" />
          <span>Reset</span>
        </div>
        <h1 className="text-3xl font-extrabold text-zinc-950 dark:text-white tracking-tight">Reset password</h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm">
          Self-service password reset is not enabled in this build. Use the login flow or contact an administrator.
        </p>
      </div>
    </div>
  );
}
