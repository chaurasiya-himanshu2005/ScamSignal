import { describe, it, expect } from "vitest";
import { analyzeRequestSchema } from "@/types/analysis";

describe("Input Validation Suite", () => {
  it("rejects messages with fewer than 5 characters", () => {
    const result = analyzeRequestSchema.safeParse({
      message: "Hey",
      channel: "sms",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toContain("at least 5 characters");
    }
  });

  it("rejects empty messages", () => {
    const result = analyzeRequestSchema.safeParse({
      message: "",
      channel: "sms",
    });

    expect(result.success).toBe(false);
  });

  it("rejects messages exceeding 5000 characters", () => {
    const longMessage = "A".repeat(5001);
    const result = analyzeRequestSchema.safeParse({
      message: longMessage,
      channel: "email",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toContain("cannot exceed 5,000 characters");
    }
  });

  it("accepts valid input with supported channels", () => {
    const channels = ["sms", "whatsapp", "email", "not_sure"] as const;

    for (const channel of channels) {
      const result = analyzeRequestSchema.safeParse({
        message: "This is a legitimate test message for verification.",
        channel,
      });

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.channel).toBe(channel);
        expect(result.data.message.length).toBeGreaterThanOrEqual(5);
      }
    }
  });

  it("defaults channel to 'not_sure' when omitted", () => {
    const result = analyzeRequestSchema.safeParse({
      message: "Suspicious message without specified channel.",
    });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.channel).toBe("not_sure");
    }
  });

  it("rejects unsupported channel types", () => {
    const result = analyzeRequestSchema.safeParse({
      message: "Suspicious message from dark web.",
      channel: "carrier_pigeon",
    });

    expect(result.success).toBe(false);
  });
});
