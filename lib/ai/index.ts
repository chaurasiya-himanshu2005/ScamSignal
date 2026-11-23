import { MessageChannel, AnalysisResult } from "@/types/analysis";
import { analyzeWithGemini } from "./gemini";
import { analyzeWithOpenAI } from "./openai";
import { runHeuristicAnalysis } from "../heuristic-analyzer";
import { extractUrls } from "../url-detector";

export interface AnalyzerExecutionResult {
  result: AnalysisResult;
  provider: "gemini" | "openai" | "heuristic";
  isDemo: boolean;
  setupNotice?: string;
}

export async function executeAnalysis(
  message: string,
  channel: MessageChannel = "not_sure"
): Promise<AnalyzerExecutionResult> {
  const geminiKey = process.env.GEMINI_API_KEY?.trim();
  const openaiKey = process.env.OPENAI_API_KEY?.trim();
  const openaiBaseUrl = process.env.OPENAI_BASE_URL?.trim() || "https://api.openai.com/v1";
  const forceDemo = process.env.DEMO_MODE === "true";

  // Check if no keys are configured or demo mode is forced
  if (forceDemo || (!geminiKey && !openaiKey)) {
    const heuristic = runHeuristicAnalysis(message, channel);
    return {
      result: heuristic,
      provider: "heuristic",
      isDemo: true,
      setupNotice:
        "Demo Mode: No AI API key is configured on this server. Running local rule-based heuristic analysis. To enable real AI analysis, configure GEMINI_API_KEY or OPENAI_API_KEY in your hosting environment variables.",
    };
  }

  // Pre-extract any URLs from the message to ensure none are missed
  const extractedUrls = extractUrls(message);

  // Preferred provider selection
  const preferredProvider = process.env.AI_PROVIDER?.toLowerCase() || (geminiKey ? "gemini" : "openai");

  try {
    let rawResult;
    let providerName: "gemini" | "openai" = "gemini";

    if (preferredProvider === "openai" && openaiKey) {
      providerName = "openai";
      rawResult = await analyzeWithOpenAI(message, channel, openaiKey, openaiBaseUrl);
    } else if (geminiKey) {
      providerName = "gemini";
      rawResult = await analyzeWithGemini(message, channel, geminiKey);
    } else if (openaiKey) {
      providerName = "openai";
      rawResult = await analyzeWithOpenAI(message, channel, openaiKey, openaiBaseUrl);
    } else {
      throw new Error("No valid AI key available.");
    }

    // Merge detected URLs from both AI analysis and regex extraction, deduplicating
    const allUrls = Array.from(new Set([...(rawResult.detected_urls || []), ...extractedUrls]));

    const finalizedResult: AnalysisResult = {
      assessment: rawResult.assessment,
      risk_level: rawResult.risk_level,
      warning_signs: rawResult.warning_signs,
      safe_next_steps: rawResult.safe_next_steps,
      uncertainty: rawResult.uncertainty || [],
      detected_urls: allUrls,
      analyzed_at: new Date().toISOString(),
      channel,
      is_demo: false,
    };

    return {
      result: finalizedResult,
      provider: providerName,
      isDemo: false,
    };
  } catch (error) {
    // If AI provider encounters an error (e.g. rate limit from Google/OpenAI, timeout, temporary outage),
    // fall back cleanly to heuristic analyzer so the user gets a helpful assessment
    const fallback = runHeuristicAnalysis(message, channel);
    fallback.is_demo = true;
    fallback.demo_notice =
      "Live AI analysis was temporarily unavailable; provided assessment was generated using local heuristic safety rules.";

    return {
      result: fallback,
      provider: "heuristic",
      isDemo: true,
      setupNotice:
        "The external AI service encountered a temporary error or timeout. A local heuristic assessment was provided instead.",
    };
  }
}
