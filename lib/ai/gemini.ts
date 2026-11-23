import { SCAMSIGNAL_SYSTEM_PROMPT, buildAnalysisUserPrompt } from "./prompts";
import { MessageChannel, RawAiResponse, aiResponseSchema } from "@/types/analysis";

export async function analyzeWithGemini(
  message: string,
  channel: MessageChannel,
  apiKey: string,
  timeoutMs: number = 15000
): Promise<RawAiResponse> {
  const modelName = process.env.GEMINI_MODEL || "gemini-1.5-flash";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${encodeURIComponent(
    apiKey
  )}`;

  const promptText = buildAnalysisUserPrompt(message, channel);

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      signal: controller.signal,
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: promptText }],
          },
        ],
        systemInstruction: {
          parts: [{ text: SCAMSIGNAL_SYSTEM_PROMPT }],
        },
        generationConfig: {
          responseMimeType: "application/json",
          temperature: 0.1,
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Gemini API returned status ${response.status}: ${errorText.slice(0, 300)}`);
    }

    const data = await response.json();
    const candidateText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!candidateText) {
      throw new Error("Gemini returned empty candidate content.");
    }

    const parsedJson = JSON.parse(candidateText);
    return aiResponseSchema.parse(parsedJson);
  } finally {
    clearTimeout(timer);
  }
}
