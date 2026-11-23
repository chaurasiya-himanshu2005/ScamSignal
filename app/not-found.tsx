import Link from "next/link";
import { ShieldAlert, ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-4 py-16 text-center sm:px-6">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
        <ShieldAlert className="h-8 w-8 text-blue-600 dark:text-blue-400" />
      </div>

      <span className="mt-6 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
        404 Error
      </span>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
        Page Not Found
      </h1>
      <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
        The page you are looking for does not exist or has been moved. You can return to ScamSignal to check a message.
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700"
        >
          <Home className="h-4 w-4" />
          <span>Go to Homepage</span>
        </Link>
        <Link
          href="/about"
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>About ScamSignal</span>
        </Link>
      </div>
    </main>
  );
}
