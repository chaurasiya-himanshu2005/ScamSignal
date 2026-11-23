import { describe, it, expect } from "vitest";
import { aiResponseSchema } from "@/types/analysis";

describe("AI Response Schema Validation Suite", () => {
  it("validates conforming structured AI responses", () => {
    const validResponse = {
      assessment: "Several warning signs",
      risk_level: "High",
      warning_signs: [
        {
          sign: "Request for one-time code",
          evidence: "Send your 6-digit OTP code",
          explanation: "Legitimate services never ask for OTPs via text.",
        },
      ],
      safe_next_steps: [
        "Do not share your one-time passcode.",
        "Contact your bank directly using official channels.",
      ],
      uncertainty: ["Cannot verify raw SMS carrier routing."],
      detected_urls: ["https://example-fake-bank.xyz/login"],
    };

    const parsed = aiResponseSchema.safeParse(validResponse);
    expect(parsed.success).toBe(true);
    if (parsed.success) {
      expect(parsed.data.risk_level).toBe("High");
      expect(parsed.data.assessment).toBe("Several warning signs");
      expect(parsed.data.warning_signs).toHaveLength(1);
    }
  });

  it("rejects response with invalid risk_level", () => {
    const invalidRisk = {
      assessment: "Several warning signs",
      risk_level: "CriticalDanger", // Invalid enum
      warning_signs: [],
      safe_next_steps: ["Do not reply."],
      uncertainty: [],
      detected_urls: [],
    };

    const parsed = aiResponseSchema.safeParse(invalidRisk);
    expect(parsed.success).toBe(false);
  });

  it("rejects response with invalid assessment category", () => {
    const invalidAssessment = {
      assessment: "Definitely A Massive Scam", // Invalid enum
      risk_level: "High",
      warning_signs: [],
      safe_next_steps: ["Do not reply."],
      uncertainty: [],
      detected_urls: [],
    };

    const parsed = aiResponseSchema.safeParse(invalidAssessment);
    expect(parsed.success).toBe(false);
  });

  it("rejects response when safe_next_steps is empty", () => {
    const missingSteps = {
      assessment: "Some warning signs",
      risk_level: "Medium",
      warning_signs: [
        {
          sign: "Unexpected link",
          evidence: "http://bit.ly/123",
          explanation: "Shortened link.",
        },
      ],
      safe_next_steps: [], // min(1) required
      uncertainty: [],
      detected_urls: [],
    };

    const parsed = aiResponseSchema.safeParse(missingSteps);
    expect(parsed.success).toBe(false);
  });

  it("handles missing optional arrays gracefully with defaults", () => {
    const minimalValid = {
      assessment: "No obvious warning signs found",
      risk_level: "Low",
      warning_signs: [],
      safe_next_steps: ["Remain alert if further requests follow."],
    };

    const parsed = aiResponseSchema.safeParse(minimalValid);
    expect(parsed.success).toBe(true);
    if (parsed.success) {
      expect(parsed.data.uncertainty).toEqual([]);
      expect(parsed.data.detected_urls).toEqual([]);
    }
  });
});
