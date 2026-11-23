import React from "react";
import { Link2Off, ShieldAlert } from "lucide-react";
import { defangUrl } from "@/lib/url-detector";

interface NonClickableUrlProps {
  urls: string[];
}

export function NonClickableUrl({ urls }: NonClickableUrlProps) {
  if (!urls || urls.length === 0) return null;

  return (
    <div className="rounded-xl border border-rose-200 bg-rose-50/70 p-4 dark:border-rose-900/60 dark:bg-rose-950/20">
      <div className="flex items-center gap-2 font-semibold text-rose-900 dark:text-rose-300">
        <Link2Off className="h-4 w-4 text-rose-600 dark:text-rose-400" />
        <h4 className="text-sm font-bold">Detected Web Links (Rendered Non-Clickable for Your Safety)</h4>
      </div>
      <p className="mt-1 text-xs text-rose-700 dark:text-rose-400">
        ScamSignal deliberately prevents clicking or opening any web address found in analyzed messages to protect you from malicious downloads and credential-harvesting pages.
      </p>

      <ul className="mt-3 space-y-2">
        {urls.map((rawUrl, idx) => (
          <li
            key={idx}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-lg border border-rose-200/80 bg-white px-3 py-2 text-xs font-mono dark:border-rose-900/40 dark:bg-slate-900"
          >
            <div className="flex items-center gap-2 overflow-hidden">
              <span className="shrink-0 select-none rounded bg-rose-100 px-1.5 py-0.5 text-[10px] font-bold uppercase text-rose-700 dark:bg-rose-950 dark:text-rose-300">
                Link #{idx + 1}
              </span>
              <span className="truncate select-all text-slate-800 dark:text-slate-200">
                {rawUrl}
              </span>
            </div>
            <span className="shrink-0 text-[11px] text-slate-500 font-sans italic">
              Defanged: <code className="font-mono text-slate-700 dark:text-slate-300">{defangUrl(rawUrl)}</code>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
