import { z } from "zod";

export type MessageChannel = "sms" | "whatsapp" | "email" | "not_sure";

export type AssessmentCategory =
  | "Several warning signs"
  | "Some warning signs"
  | "No obvious warning signs found";

export type RiskLevel = "High" | "Medium" | "Low";

export interface WarningSign {
  sign: string;
  evidence: string;
  explanation: string;
}

export interface AnalysisResult {
  assessment: AssessmentCategory;
  risk_level: RiskLevel;
  warning_signs: WarningSign[];
  safe_next_steps: string[];
  uncertainty: string[];
  detected_urls: string[];
  analyzed_at: string;
  channel: MessageChannel;
  is_demo: boolean;
  demo_notice?: string;
}

// Request validation schema
export const analyzeRequestSchema = z.object({
  message: z
    .string()
    .min(5, "Message must be at least 5 characters long.")
    .max(5000, "Message cannot exceed 5,000 characters to prevent excessive processing costs."),
  channel: z.enum(["sms", "whatsapp", "email", "not_sure"]).default("not_sure"),
});

export type AnalyzeRequestBody = z.infer<typeof analyzeRequestSchema>;

// Strict Zod schema for AI response
export const aiResponseSchema = z.object({
  assessment: z.enum([
    "Several warning signs",
    "Some warning signs",
    "No obvious warning signs found",
  ]),
  risk_level: z.enum(["High", "Medium", "Low"]),
  warning_signs: z.array(
    z.object({
      sign: z.string().min(1),
      evidence: z.string().default(""),
      explanation: z.string().min(1),
    })
  ),
  safe_next_steps: z.array(z.string().min(1)).min(1),
  uncertainty: z.array(z.string()).default([]),
  detected_urls: z.array(z.string()).default([]),
});

export type RawAiResponse = z.infer<typeof aiResponseSchema>;
