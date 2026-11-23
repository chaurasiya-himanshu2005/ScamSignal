import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Lock, EyeOff, Server, AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy — Data Handling, AI Processing, and Zero Retention",
  description:
    "ScamSignal Privacy Policy: How we handle submitted text, AI provider transmission, and our strict zero-retention commitment.",
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="space-y-10">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Privacy Policy
          </span>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Our Commitment to Your Privacy
          </h1>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
            Last updated: November 2026. ScamSignal is engineered with a strict privacy-first architecture.
          </p>
        </div>

        {/* Highlight Banner */}
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-6 dark:border-emerald-900/60 dark:bg-emerald-950/30">
          <div className="flex items-start gap-3">
            <Lock className="h-6 w-6 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h2 className="text-base font-bold text-emerald-950 dark:text-emerald-200">
                Summary: We Do Not Store Your Messages
              </h2>
              <p className="text-xs leading-relaxed text-emerald-900 dark:text-emerald-300">
                Any message you submit is held only in temporary server memory during the seconds required to process the analysis. We do not store, log, serialize, or build profiles from the text you paste.
              </p>
            </div>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="space-y-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
          {/* Section 1 */}
          <div>
            <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
              <Server className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <h3 className="text-base">1. Transmission to Configured AI Provider</h3>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
              When you click &ldquo;Analyze Message&rdquo;, your submitted message text is transmitted over an encrypted HTTPS connection to our backend API route, which forwards it to the host&apos;s configured AI provider (e.g. Google Gemini or OpenAI) solely to generate the structured risk evaluation. If the application is running in local fallback / demo mode without an AI key, the text remains entirely on the server and is evaluated locally by heuristic rules.
            </p>
          </div>

          {/* Section 2 */}
          <div className="border-t border-slate-200/80 pt-6 dark:border-slate-800">
            <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
              <EyeOff className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <h3 className="text-base">2. Sensitive Personal Information Advice</h3>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
              Before submitting a message, we recommend redacting or removing private identifying details that are not necessary for linguistic evaluation, such as your personal credit card numbers, Social Security numbers, or specific account passwords.
            </p>
          </div>

          {/* Section 3 */}
          <div className="border-t border-slate-200/80 pt-6 dark:border-slate-800">
            <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
              <ShieldCheck className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <h3 className="text-base">3. Rate Limiting and Network Logs</h3>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
              To prevent automated denial-of-service abuse and manage API costs, our server tracks the frequency of requests by IP address in temporary, rolling in-memory windows. We do not correlate your IP address with the contents of your messages, nor do we sell or share IP records.
            </p>
          </div>

          {/* Section 4 */}
          <div className="border-t border-slate-200/80 pt-6 dark:border-slate-800">
            <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
              <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <h3 className="text-base">4. Cookies and Tracking Technologies</h3>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
              ScamSignal does not use tracking cookies, cross-site advertising trackers, or marketing analytics scripts. The application functions cleanly without requiring user accounts or logins.
            </p>
          </div>
        </div>

        {/* Back link */}
        <div className="flex items-center gap-4 text-sm font-semibold">
          <Link href="/#analyzer" className="text-blue-600 hover:underline dark:text-blue-400">
            ← Return to Message Analyzer
          </Link>
          <span className="text-slate-300 dark:text-slate-700">|</span>
          <Link href="/limitations" className="text-slate-600 hover:underline dark:text-slate-400">
            Read Limitations & Disclaimers →
          </Link>
        </div>
      </div>
    </main>
  );
}
