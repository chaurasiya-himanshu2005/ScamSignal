import React, { useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  ShieldAlert,
  Copy,
  Check,
  RotateCcw,
  Info,
  Quote,
} from "lucide-react";
import { AnalysisResult } from "@/types/analysis";
import { RiskBadge } from "./RiskBadge";
import { NonClickableUrl } from "./NonClickableUrl";

interface ResultsCardProps {
  result: AnalysisResult;
  onReset: () => void;
}

export function ResultsCard({ result, onReset }: ResultsCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopySummary = async () => {
    const textSummary = `[ScamSignal Analysis Report]
Assessment: ${result.assessment}
Risk Level: ${result.risk_level}
Channel: ${result.channel.toUpperCase()}

Warning Signs:
${
  result.warning_signs.length > 0
    ? result.warning_signs
        .map(
          (s, i) =>
            `${i + 1}. ${s.sign}\n   Evidence: ${s.evidence || "None quoted"}\n   Why: ${s.explanation}`
        )
        .join("\n\n")
    : "No major warning signs identified in text."
}

Safe Next Steps:
${result.safe_next_steps.map((step, i) => `${i + 1}. ${step}`).join("\n")}

Uncertainty & Notes:
${result.uncertainty.map((u, i) => `• ${u}`).join("\n")}

Analyzed: ${new Date(result.analyzed_at).toLocaleString()}`;

    try {
      await navigator.clipboard.writeText(textSummary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Ignore clipboard write failure in unsecure contexts
    }
  };

  return (
    <div className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
      {/* Demo Notice Banner if active */}
      {result.is_demo && (
        <div className="flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50/80 p-4 text-xs text-blue-900 dark:border-blue-900/60 dark:bg-blue-950/40 dark:text-blue-200">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400" />
          <div className="space-y-1">
            <p className="font-semibold">Demo / Heuristic Mode Active</p>
            <p className="text-blue-800 dark:text-blue-300">
              {result.demo_notice ||
                "No AI API key was configured on the server. This analysis was generated locally using rule-based heuristic pattern matching."}
            </p>
          </div>
        </div>
      )}

      {/* Header & Risk Level */}
      <div className="flex flex-col gap-4 border-b border-slate-200 pb-6 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Assessment Results
          </span>
          <div className="mt-1">
            <RiskBadge riskLevel={result.risk_level} assessment={result.assessment} />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopySummary}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white"
            title="Copy analysis summary to clipboard"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-600" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Copy Summary</span>
              </>
            )}
          </button>
          <button
            onClick={onReset}
            className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white shadow-sm transition hover:bg-blue-700"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Check Another</span>
          </button>
        </div>
      </div>

      {/* Warning signs section */}
      <div>
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Warning Signs Identified ({result.warning_signs.length})
          </h3>
        </div>

        {result.warning_signs.length === 0 ? (
          <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-800/40 dark:text-slate-300">
            <p>
              No obvious warning signs (such as urgent deadlines, threats, requests for OTPs, or suspicious domains) were detected in the text you provided.
            </p>
          </div>
        ) : (
          <div className="mt-3 space-y-3">
            {result.warning_signs.map((sign, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-slate-200/90 bg-slate-50/60 p-4 dark:border-slate-800 dark:bg-slate-800/30"
              >
                <div className="flex items-start gap-2.5">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-200 text-xs font-bold text-slate-700 dark:bg-slate-700 dark:text-slate-200">
                    {idx + 1}
                  </span>
                  <div className="space-y-2">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      {sign.sign}
                    </h4>

                    {/* Exact Evidence Quoted */}
                    {sign.evidence && sign.evidence.trim() !== "" && (
                      <div className="flex items-start gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs dark:border-slate-700/80 dark:bg-slate-900">
                        <Quote className="h-3.5 w-3.5 shrink-0 text-slate-400 mt-0.5" />
                        <div>
                          <span className="font-semibold text-slate-600 dark:text-slate-400">
                            Exact Quoted Evidence:{" "}
                          </span>
                          <span className="font-mono text-slate-900 dark:text-slate-100">
                            {sign.evidence}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Plain language explanation */}
                    <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                      <span className="font-semibold text-slate-700 dark:text-slate-200">
                        Why this is risky:{" "}
                      </span>
                      {sign.explanation}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Non-clickable URLs display */}
      {result.detected_urls && result.detected_urls.length > 0 && (
        <NonClickableUrl urls={result.detected_urls} />
      )}

      {/* What to do next (Safe Next Steps) */}
      <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-5 dark:border-emerald-950 dark:bg-emerald-950/20">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          <h3 className="text-base font-bold text-emerald-950 dark:text-emerald-200">
            What to Do Next (Safe Defensive Steps)
          </h3>
        </div>

        <ul className="mt-3 space-y-2.5">
          {result.safe_next_steps.map((step, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-emerald-900 dark:text-emerald-200">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-200 text-xs font-bold text-emerald-900 dark:bg-emerald-900 dark:text-emerald-100">
                {idx + 1}
              </span>
              <span className="leading-relaxed">{step}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Uncertainty & Limitations */}
      <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4 text-xs text-slate-600 dark:border-slate-800 dark:bg-slate-800/20 dark:text-slate-400">
        <div className="flex items-center gap-1.5 font-semibold text-slate-800 dark:text-slate-200">
          <HelpCircle className="h-4 w-4 text-slate-500" />
          <span>Uncertainty & Technical Context Missing</span>
        </div>
        <ul className="mt-2 list-disc space-y-1 pl-5 leading-relaxed">
          {result.uncertainty.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
