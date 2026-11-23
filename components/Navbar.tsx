import Link from "next/link";
import { ShieldCheck, AlertCircle } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-950/90">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2.5 font-bold text-slate-900 transition-colors hover:text-blue-600 dark:text-white dark:hover:text-blue-400"
          aria-label="ScamSignal Home"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white shadow-sm shadow-blue-500/20">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-extrabold tracking-tight">ScamSignal</span>
            <span className="text-[10px] font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Message Risk Analyzer
            </span>
          </div>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-6" aria-label="Main Navigation">
          <Link
            href="/#analyzer"
            className="rounded-md px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            Check Message
          </Link>
          <Link
            href="/about"
            className="rounded-md px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            About
          </Link>
          <Link
            href="/limitations"
            className="hidden sm:inline-block rounded-md px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            Limitations
          </Link>
          <Link
            href="/privacy"
            className="rounded-md px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            Privacy
          </Link>
        </nav>
      </div>
    </header>
  );
}
