import React from "react";
import Link from "next/link";
import { ShieldCheck, ArrowDown, Lock, Search, AlertTriangle, Eye } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden py-12 sm:py-20">
      <div className="mx-auto max-w-4xl text-center">
        {/* Safe Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/80 px-3.5 py-1.5 text-xs font-semibold text-blue-800 shadow-sm dark:border-blue-900/60 dark:bg-blue-950/60 dark:text-blue-300">
          <ShieldCheck className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <span>Independent Educational Message Security Analyzer</span>
        </div>

        {/* Main Title */}
        <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl sm:leading-tight">
          Assess Suspicious SMS, WhatsApp & Emails in Seconds
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg">
          Received a message demanding an OTP, threatening account suspension, or offering an unexpected cash prize? Paste it below to identify social engineering warning signs and learn safe next steps.
        </p>

        {/* Call to Action Button */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#analyzer"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition hover:bg-blue-700 hover:shadow-blue-500/35 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <span>Check a Message</span>
            <ArrowDown className="h-4 w-4" />
          </a>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-bold text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            <span>How it Works</span>
          </Link>
        </div>

        {/* Value props strip */}
        <div className="mt-12 grid grid-cols-1 gap-4 text-left sm:grid-cols-3">
          <div className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm dark:border-slate-800/80 dark:bg-slate-900/60">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
              <Search className="h-4 w-4" />
            </div>
            <h3 className="mt-3 text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Evidence-Based
            </h3>
            <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
              Quotes the exact phrases that triggered warnings, separating raw text from analysis.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm dark:border-slate-800/80 dark:bg-slate-900/60">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
              <Lock className="h-4 w-4" />
            </div>
            <h3 className="mt-3 text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Zero Retention
            </h3>
            <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
              Messages are analyzed in volatile memory. No user message database is maintained.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm dark:border-slate-800/80 dark:bg-slate-900/60">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400">
              <Eye className="h-4 w-4" />
            </div>
            <h3 className="mt-3 text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Safe Non-Clickable Links
            </h3>
            <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
              External URLs are rendered purely as plain text to prevent accidental clicks.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
