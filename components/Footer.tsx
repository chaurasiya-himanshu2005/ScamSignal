import Link from "next/link";
import { ShieldCheck, Lock, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-400">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand & mission */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
              <ShieldCheck className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <span className="text-lg">ScamSignal</span>
            </div>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
              ScamSignal is an independent educational tool designed to help consumers assess suspicious SMS, WhatsApp, and email messages for common social engineering and phishing indicators.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
              <Lock className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Privacy First: Submitted text is analyzed in memory and never retained.</span>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white">
              Navigation
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/#analyzer" className="hover:text-blue-600 dark:hover:text-blue-400">
                  Analyze a Message
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-blue-600 dark:hover:text-blue-400">
                  About ScamSignal
                </Link>
              </li>
              <li>
                <Link href="/limitations" className="hover:text-blue-600 dark:hover:text-blue-400">
                  Limitations & Safety
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-blue-600 dark:hover:text-blue-400">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Official Consumer Resources */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white">
              Official Reporting
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a
                  href="https://reportfraud.ftc.gov"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  US FTC Fraud Report
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.ic3.gov"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  FBI IC3 Cybercrime
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.consumerfinance.gov/consumer-tools/fraud/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  CFPB Scam Resources
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer banner */}
        <div className="mt-10 border-t border-slate-200/80 pt-6 dark:border-slate-800">
          <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
            <strong>Important Safety Notice:</strong> ScamSignal provides automated pattern analysis for informational and educational awareness only. It cannot guarantee that any message is definitely safe or definitely fraudulent. Scammers continually adapt their techniques. Never share one-time passwords (OTPs), PINs, passwords, or send funds based on messages received. When in doubt, verify directly through official channels.
          </p>
          <div className="mt-4 flex flex-col items-center justify-between gap-2 text-xs text-slate-500 sm:flex-row">
            <span>© {new Date().getFullYear()} ScamSignal. Open source community security initiative.</span>
            <span>Built with Next.js & TypeScript.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
