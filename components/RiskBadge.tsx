import React from "react";
import { ShieldAlert, AlertTriangle, ShieldCheck } from "lucide-react";
import { RiskLevel, AssessmentCategory } from "@/types/analysis";

interface RiskBadgeProps {
  riskLevel: RiskLevel;
  assessment: AssessmentCategory;
  showAssessment?: boolean;
}

export function RiskBadge({ riskLevel, assessment, showAssessment = true }: RiskBadgeProps) {
  if (riskLevel === "High") {
    return (
      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-rose-800 dark:bg-rose-950/80 dark:text-rose-300 border border-rose-300 dark:border-rose-800">
          <ShieldAlert className="h-4 w-4 text-rose-600 dark:text-rose-400" />
          <span>High Risk</span>
        </span>
        {showAssessment && (
          <span className="text-base font-semibold text-rose-700 dark:text-rose-400">
            {assessment}
          </span>
        )}
      </div>
    );
  }

  if (riskLevel === "Medium") {
    return (
      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-900 dark:bg-amber-950/80 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
          <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
          <span>Medium Risk</span>
        </span>
        {showAssessment && (
          <span className="text-base font-semibold text-amber-700 dark:text-amber-400">
            {assessment}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-900 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
        <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
        <span>Low Risk</span>
      </span>
      {showAssessment && (
        <span className="text-base font-semibold text-emerald-700 dark:text-emerald-400">
          {assessment}
        </span>
      )}
    </div>
  );
}
