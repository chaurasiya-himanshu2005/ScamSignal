import React from "react";
import { AlertOctagon, Key, ExternalLink, CreditCard, ShieldAlert, CheckCircle } from "lucide-react";

export function EducationalGuide() {
  return (
    <section className="mt-16 space-y-12 border-t border-slate-200 pt-16 dark:border-slate-800">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
          Understanding Modern Message Scams
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600 dark:text-slate-400">
          Phishing and social engineering rely on psychological manipulation rather than high-tech hacking. Recognizing these patterns protects your finances and identity.
        </p>
      </div>

      {/* Grid of indicators */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-100 text-rose-600 dark:bg-rose-950 dark:text-rose-400">
              <Key className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white">One-Time Passcodes & Credentials</h3>
              <span className="text-xs text-rose-600 dark:text-rose-400 font-semibold">Critical Warning Sign</span>
            </div>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
            Banks and services use SMS OTPs to authenticate transactions or password resets. A scammer will trigger a login attempt and text you claiming they are fraud prevention, asking you to read back the code. <strong>Never share two-factor codes with anyone.</strong>
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400">
              <AlertOctagon className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white">Manufactured Urgency & Panic</h3>
              <span className="text-xs text-amber-600 dark:text-amber-400 font-semibold">Psychological Pressure</span>
            </div>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
            Messages asserting your account will be deleted, you face arrest, or a fee must be paid within 2 to 24 hours are designed to hijack rational decision-making. Legitimate legal and financial notices arrive via postal mail or secure account inboxes.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
              <ExternalLink className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white">Lookalike Domains & URL Shorteners</h3>
              <span className="text-xs text-blue-600 dark:text-blue-400 font-semibold">Technical Deception</span>
            </div>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
            Attackers register domains like <code>usps-track-package.top</code> or use shortened links (<code>bit.ly</code>) to mimic trusted portals. Always inspect the exact root domain before entering any information.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-600 dark:bg-purple-950 dark:text-purple-400">
              <CreditCard className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white">Irreversible Payment Channels</h3>
              <span className="text-xs text-purple-600 dark:text-purple-400 font-semibold">Financial Extraction</span>
            </div>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
            Demands for payment via cryptocurrency (Bitcoin, USDT), retailer gift cards (Apple, Google Play), wire transfers, or peer-to-peer apps are a guarantee of fraud. Legitimate organizations accept standard merchant credit card processing with fraud protection.
          </p>
        </div>
      </div>

      {/* Recommended safety protocols */}
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900/60 sm:p-8">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          The 3-Step Verification Rule
        </h3>
        <p className="mt-2 text-xs text-slate-600 dark:text-slate-400">
          Whenever you receive an alarming or unexpected message:
        </p>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl bg-white p-4 shadow-sm dark:bg-slate-800">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400">Step 1</span>
            <h4 className="mt-1 text-sm font-bold text-slate-900 dark:text-white">Pause & Stop</h4>
            <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
              Do not click links, do not reply, and do not call the phone number provided in the message.
            </p>
          </div>
          <div className="rounded-xl bg-white p-4 shadow-sm dark:bg-slate-800">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400">Step 2</span>
            <h4 className="mt-1 text-sm font-bold text-slate-900 dark:text-white">Verify Independently</h4>
            <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
              Open your browser and navigate to the company&apos;s official website directly, or call the phone number on the back of your card.
            </p>
          </div>
          <div className="rounded-xl bg-white p-4 shadow-sm dark:bg-slate-800">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400">Step 3</span>
            <h4 className="mt-1 text-sm font-bold text-slate-900 dark:text-white">Report & Block</h4>
            <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
              Forward spam SMS to 7726 (SPAM) on major mobile networks, report it in WhatsApp, and block the sender.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
