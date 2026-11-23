import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, ShieldX, LifeBuoy, PhoneCall, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Limitations & Safety Disclaimers — ScamSignal",
  description:
    "Important safety limitations, why automated scam detection cannot be guaranteed, and emergency steps if you suspect you were scammed.",
};

export default function LimitationsPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="space-y-10">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            Disclaimers & Limits
          </span>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Tool Limitations & Emergency Guidance
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300">
            ScamSignal is designed to raise awareness and provide an educational assessment of common scam indicators. It is not an infallible cybersecurity safeguard.
          </p>
        </div>

        {/* Warning banner */}
        <div className="rounded-2xl border border-amber-200 bg-amber-50/80 p-6 dark:border-amber-900/60 dark:bg-amber-950/30">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-6 w-6 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h2 className="text-base font-bold text-amber-950 dark:text-amber-200">
                No Guarantee of 100% Accuracy
              </h2>
              <p className="mt-1 text-xs leading-relaxed text-amber-900 dark:text-amber-300">
                A result of &ldquo;No obvious warning signs found&rdquo; does <strong>not</strong> prove that a message is authentic, legitimate, or safe. Conversely, a result of &ldquo;Several warning signs&rdquo; identifies common risk factors but cannot establish legal proof of fraud.
              </p>
            </div>
          </div>
        </div>

        {/* Limitations breakdown */}
        <div className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Why Automated Text Analysis Has Boundaries
          </h2>

          <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/40">
              <h3 className="font-bold text-slate-900 dark:text-white">
                1. Sender Address & Caller ID Spoofing
              </h3>
              <p className="mt-1">
                Attackers frequently forge SMS sender names and email display headers. Even if the text appears benign, the origin can be spoofed. Only examining raw cryptographic headers (SPF, DKIM, DMARC) or calling back through verified phone lines can establish origin.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/40">
              <h3 className="font-bold text-slate-900 dark:text-white">
                2. Compromised Legitimate Accounts
              </h3>
              <p className="mt-1">
                If a trusted friend, colleague, or company has their actual account hijacked, messages sent from their real email or messaging address may look authentic while being directed by an adversary.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/40">
              <h3 className="font-bold text-slate-900 dark:text-white">
                3. Evolving Phishing Tactics
              </h3>
              <p className="mt-1">
                Adversaries continually alter their syntax, employ zero-day redirectors, or use benign initial conversation starters (&ldquo;Hi, is this David?&rdquo;) to build rapport before attempting fraud in subsequent messages.
              </p>
            </div>
          </div>
        </div>

        {/* Emergency Steps Section */}
        <div className="rounded-2xl border border-rose-200 bg-rose-50/50 p-6 dark:border-rose-900/40 dark:bg-rose-950/20 sm:p-8">
          <div className="flex items-center gap-2">
            <LifeBuoy className="h-5 w-5 text-rose-600 dark:text-rose-400" />
            <h2 className="text-lg font-bold text-rose-950 dark:text-rose-200">
              What to Do If You Already Shared Information or Sent Money
            </h2>
          </div>
          <p className="mt-2 text-xs text-rose-800 dark:text-rose-300">
            If you realize you have fallen for a scam, take immediate action to mitigate harm:
          </p>

          <ol className="mt-4 list-decimal space-y-3 pl-5 text-xs sm:text-sm text-rose-950 dark:text-rose-200">
            <li>
              <strong>Contact your financial institution immediately:</strong> Call the fraud department number printed directly on the back of your debit/credit card or on your monthly statement. Ask them to freeze compromised cards or reverse unauthorized transfers.
            </li>
            <li>
              <strong>Change passwords and revoke active sessions:</strong> Update your login password on affected accounts immediately and enable multi-factor authentication (preferring an authenticator app over SMS where available).
            </li>
            <li>
              <strong>Place a fraud alert or credit freeze:</strong> If you shared your Social Security number or personal identity details, contact major credit reporting bureaus (Equifax, Experian, TransUnion) to freeze your credit files.
            </li>
            <li>
              <strong>Report the crime to law enforcement:</strong> File a formal report at{" "}
              <a
                href="https://reportfraud.ftc.gov"
                target="_blank"
                rel="noopener noreferrer"
                className="underline font-bold"
              >
                ReportFraud.ftc.gov
              </a>{" "}
              (USA) or the equivalent consumer fraud authority in your country.
            </li>
          </ol>
        </div>

        {/* Return Button */}
        <div>
          <Link
            href="/#analyzer"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-md shadow-blue-500/20 transition hover:bg-blue-700"
          >
            ← Back to ScamSignal Analyzer
          </Link>
        </div>
      </div>
    </main>
  );
}
