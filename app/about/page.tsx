import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Lock, EyeOff, Code2, AlertTriangle, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About ScamSignal — Purpose, Mission, and Security Principles",
  description:
    "Learn why ScamSignal was built, our privacy-first design principles, and how our message risk evaluation engine works.",
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="space-y-10">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            About The Project
          </span>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Empowering Consumers Against Social Engineering
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300">
            ScamSignal is an open-access educational security tool developed to help people independently evaluate suspicious SMS messages, WhatsApp chats, and emails.
          </p>
        </div>

        {/* Why this matters */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            The Problem: The Psychology of Modern Scams
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            Cybercriminals no longer rely primarily on software vulnerabilities to compromise individuals; they exploit human emotion. By engineering synthetic crises — such as bank account freezes, uncollected package notifications, fake family emergencies, or lucrative work-from-home offers — attackers provoke hasty decisions before victims have time to verify the claim.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            ScamSignal provides a safe, unemotional second opinion. By extracting linguistic patterns of coercive urgency, credential solicitation, and suspicious destination links, ScamSignal highlights specific red flags so you can pause, reflect, and take defensive action.
          </p>
        </div>

        {/* Core Principles Grid */}
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Core Security & Privacy Principles
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                <Lock className="h-5 w-5" />
              </div>
              <h3 className="mt-3 font-bold text-slate-900 dark:text-white">
                Zero Data Retention
              </h3>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                We do not maintain a database of submitted messages. Content is processed in server memory for the duration of the request and then discarded.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="mt-3 font-bold text-slate-900 dark:text-white">
                Defensive Guidance Only
              </h3>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                ScamSignal will never advise you to share an OTP, click an unverified link, or wire funds. All recommendations emphasize independent verification through trusted contacts.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-rose-100 text-rose-600 dark:bg-rose-950 dark:text-rose-400">
                <EyeOff className="h-5 w-5" />
              </div>
              <h3 className="mt-3 font-bold text-slate-900 dark:text-white">
                Non-Clickable Link Safety
              </h3>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                All URLs detected within messages are rendered strictly as inert text and defanged to eliminate the risk of accidental clicks.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-950 dark:text-purple-400">
                <Code2 className="h-5 w-5" />
              </div>
              <h3 className="mt-3 font-bold text-slate-900 dark:text-white">
                Transparent AI Integration
              </h3>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                We openly disclose when AI providers (such as Google Gemini or OpenAI) are used to analyze text structure, backed by deterministic fallback heuristics.
              </p>
            </div>
          </div>
        </div>

        {/* Limitations Notice */}
        <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-5 dark:border-amber-900/60 dark:bg-amber-950/20">
          <div className="flex items-center gap-2 font-bold text-amber-900 dark:text-amber-200">
            <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            <h3>Important Disclaimer on Safety Guarantees</h3>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-amber-800 dark:text-amber-300">
            No automated analysis system can guarantee with 100% certainty that a message is authentic or fraudulent. Sophisticated adversaries continually evolve phrasing and evade filters. ScamSignal should be used as an informative aid, not as a replacement for personal diligence.
          </p>
        </div>

        {/* Back to tool button */}
        <div className="pt-4">
          <Link
            href="/#analyzer"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-md shadow-blue-500/20 transition hover:bg-blue-700"
          >
            <span>Try the Analyzer</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}
