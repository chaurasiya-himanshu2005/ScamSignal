import { SCAMSIGNAL_SYSTEM_PROMPT, buildAnalysisUserPrompt } from "./prompts";
import { MessageChannel, RawAiResponse, aiResponseSchema } from "@/types/analysis";

export async function analyzeWithOpenAI(
  message: string,
  channel: MessageChannel,
  apiKey: string,
  baseUrl: string = "https://api.openai.com/v1",
  timeoutMs: number = 15000
): Promise<RawAiResponse> {
  const modelName = process.env.OPENAI_MODEL || "gpt-4o-mini";
  const endpoint = `${baseUrl.replace(/\/+$/, "")}/chat/completions`;
  const promptText = buildAnalysisUserPrompt(message, channel);

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      signal: controller.signal,
      body: JSON.stringify({
        model: modelName,
        messages: [
          { role: "system", content: SCAMSIGNAL_SYSTEM_PROMPT },
          { role: "user", content: promptText },
        ],
        response_format: { type: "json_object" },
        temperature: 0.1,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`OpenAI API returned status ${response.status}: ${errorText.slice(0, 300)}`);
    }

    const data = await response.json();
    const content = data?.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("OpenAI API returned empty message content.");
    }

    const parsedJson = JSON.parse(content);
    return aiResponseSchema.parse(parsedJson);
  } finally {
    clearTimeout(timer);
  }
}
