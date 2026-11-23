import { describe, it, expect } from "vitest";
import { runHeuristicAnalysis } from "@/lib/heuristic-analyzer";
import { extractUrls, defangUrl } from "@/lib/url-detector";
import { checkRateLimit } from "@/lib/rate-limiter";

describe("Heuristic & Risk Evaluation Suite", () => {
  it("classifies bank OTP demand with urgency as High risk with Several warning signs", () => {
    const message =
      "URGENT: Your Chase account is locked. Within 24 hours provide your 6-digit OTP code to restore access or face legal action http://verify-bank.xyz";
    const result = runHeuristicAnalysis(message, "sms");

    expect(result.risk_level).toBe("High");
    expect(result.assessment).toBe("Several warning signs");
    expect(result.warning_signs.length).toBeGreaterThanOrEqual(2);

    // Verify OTP indicator is flagged with evidence
    const otpSign = result.warning_signs.find((s) => s.sign.toLowerCase().includes("otp"));
    expect(otpSign).toBeDefined();
    expect(otpSign?.evidence).toContain("OTP");

    // Verify safe next steps don't advise sharing code
    expect(result.safe_next_steps.some((step) => step.toLowerCase().includes("never reply"))).toBe(true);
  });

  it("classifies benign dental appointment reminder as Low risk with No obvious warning signs found", () => {
    const message =
      "Hi Alex, this is a friendly reminder for your dental appointment tomorrow at 2 PM. Reply C to confirm.";
    const result = runHeuristicAnalysis(message, "sms");

    expect(result.risk_level).toBe("Low");
    expect(result.assessment).toBe("No obvious warning signs found");
    expect(result.warning_signs).toHaveLength(0);
  });

  it("classifies unexpected link from unknown source as Medium risk with Some warning signs", () => {
    const message = "Check out this document at https://mysite.org/doc";
    const result = runHeuristicAnalysis(message, "sms");

    expect(result.risk_level).toBe("Medium");
    expect(result.assessment).toBe("Some warning signs");
    expect(result.warning_signs.length).toBe(1);
  });

  it("safely extracts and defangs URLs", () => {
    const message = "Visit https://malicious-bank.top/login or http://bit.ly/claim-prize now.";
    const urls = extractUrls(message);

    expect(urls).toHaveLength(2);
    expect(urls).toContain("https://malicious-bank.top/login");
    expect(urls).toContain("http://bit.ly/claim-prize");

    const defanged = urls.map(defangUrl);
    expect(defanged[0]).toBe("hxxps[://]malicious-bank[.]top/login");
    expect(defanged[1]).toBe("hxxp[://]bit[.]ly/claim-prize");
  });

  it("enforces sliding-window rate limiting per IP", () => {
    const testIp = "192.0.2.42";
    const limit = 3;
    const windowSeconds = 60;

    // Requests 1 to 3 should succeed
    const r1 = checkRateLimit(testIp, limit, windowSeconds);
    expect(r1.success).toBe(true);
    expect(r1.remaining).toBe(2);

    const r2 = checkRateLimit(testIp, limit, windowSeconds);
    expect(r2.success).toBe(true);
    expect(r2.remaining).toBe(1);

    const r3 = checkRateLimit(testIp, limit, windowSeconds);
    expect(r3.success).toBe(true);
    expect(r3.remaining).toBe(0);

    // Request 4 should be rate-limited
    const r4 = checkRateLimit(testIp, limit, windowSeconds);
    expect(r4.success).toBe(false);
    expect(r4.remaining).toBe(0);
    expect(r4.resetSeconds).toBeGreaterThan(0);
  });
});
