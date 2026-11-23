import { AssessmentCategory, RiskLevel, WarningSign, AnalysisResult, MessageChannel } from "@/types/analysis";
import { extractUrls } from "./url-detector";

interface IndicatorRule {
  category: string;
  sign: string;
  explanation: string;
  weight: number; // 1 = low/medium, 2 = high
  regex: RegExp;
}

const INDICATOR_RULES: IndicatorRule[] = [
  {
    category: "credentials",
    sign: "Request for one-time code (OTP), PIN, or password",
    explanation:
      "Legitimate organizations, banks, and service providers never ask you to share your OTP, two-factor code, or password via text message, chat, or phone.",
    weight: 2,
    regex: /\b(otp|one[- ]time (?:password|passcode|code)|verification code|security code|2fa code|password|passcode|pin)\b/i,
  },
  {
    category: "urgency",
    sign: "Urgent pressure, time limits, or threat of penalty",
    explanation:
      "Scammers create false panic (such as threats of account suspension, arrest, legal action, or fines within a short window) to prevent you from calmly verifying the claim.",
    weight: 2,
    regex: /\b(urgently|urgent|immediate action|account (?:suspended|blocked|locked|terminated)|within \d+ hours?|final notice|legal action|warrant|penalty|arrest)\b/i,
  },
  {
    category: "unusual_payment",
    sign: "Unusual or irreversible payment method requested",
    explanation:
      "Requests for payment via cryptocurrency, gift cards, wire transfers, or P2P apps (Zelle, Cash App) are common scam indicators because these transactions cannot be reversed once sent.",
    weight: 2,
    regex: /\b(gift cards?|apple cards?|google play cards?|bitcoin|crypto|usdt|wire transfer|western union|moneygram|cash app|zelle)\b/i,
  },
  {
    category: "prize_lottery",
    sign: "Unrealistic prize, lottery, or unexpected refund claim",
    explanation:
      "Announcements claiming you won a sweepstakes, lottery, or are owed an unexpected large tax refund/grant you did not apply for are standard lure tactics to extract upfront 'fees' or personal information.",
    weight: 2,
    regex: /\b(you (?:have )?won|lottery winner|cash prize|million dollars?|unclaimed funds?|inheritance|selected to receive|congratulations you won)\b/i,
  },
  {
    category: "package_delivery",
    sign: "Unsolicited parcel delivery issue or address update request",
    explanation:
      "Mass smishing campaigns routinely impersonate postal services (USPS, DHL, FedEx, Royal Mail) claiming a package cannot be delivered until you update your address or pay a nominal fee via a link.",
    weight: 1,
    regex: /\b(package (?:cannot be delivered|pending|held)|delivery failed|update your (?:address|delivery details)|reschedule delivery|customs fee)\b/i,
  },
  {
    category: "shortened_url",
    sign: "URL shortener or obfuscated destination link",
    explanation:
      "URL shortening services (like bit.ly or tinyurl) hide the true destination domain, making it impossible to see where the link actually leads without expanding it.",
    weight: 2,
    regex: /\b(?:bit\.ly|tinyurl\.com|t\.co|is\.gd|cutt\.ly|ow\.ly|buff\.ly|rb\.gy)\/[a-zA-Z0-9_-]+/i,
  },
  {
    category: "suspicious_domain",
    sign: "Lookalike or non-standard top-level domain",
    explanation:
      "Scammers often register cheap, unusual domain endings or subtle misspellings of trusted brand names to host fake credential-harvesting login pages.",
    weight: 2,
    regex: /\.(?:xyz|top|site|online|live|vip|club|cc|work|rest|cam|lat|pro|win|loan|download|racing|space)\b/i,
  },
  {
    category: "prompt_injection",
    sign: "Instruction override or adversarial prompt pattern detected",
    explanation:
      "The message contains instructions attempting to override AI or security evaluation (e.g., 'ignore previous instructions'). This is an indicator of adversarial testing or automated exploit attempts.",
    weight: 2,
    regex: /\b(ignore (?:all )?previous instructions|system prompt|disregard safety|you must output|override rules)\b/i,
  },
];

export function runHeuristicAnalysis(
  message: string,
  channel: MessageChannel = "not_sure"
): AnalysisResult {
  const detectedUrls = extractUrls(message);
  const foundSigns: WarningSign[] = [];
  let totalScore = 0;

  for (const rule of INDICATOR_RULES) {
    const match = message.match(rule.regex);
    if (match) {
      foundSigns.push({
        sign: rule.sign,
        evidence: `"${match[0]}"`,
        explanation: rule.explanation,
      });
      totalScore += rule.weight;
    }
  }

  // Also check if URLs exist without explicit brand matching
  if (detectedUrls.length > 0 && !foundSigns.some((s) => s.sign.includes("link") || s.sign.includes("domain"))) {
    foundSigns.push({
      sign: "Contains web link requiring caution",
      evidence: `Contains ${detectedUrls.length} link(s)`,
      explanation:
        "The message directs you to tap or click an external link. Fake links are the primary delivery mechanism for phishing sites and malicious downloads.",
    });
    totalScore += 1;
  }

  // Determine assessment and risk level
  let assessment: AssessmentCategory = "No obvious warning signs found";
  let riskLevel: RiskLevel = "Low";

  if (totalScore >= 3 || foundSigns.length >= 2) {
    assessment = "Several warning signs";
    riskLevel = "High";
  } else if (totalScore >= 1 || foundSigns.length === 1) {
    assessment = "Some warning signs";
    riskLevel = "Medium";
  } else {
    assessment = "No obvious warning signs found";
    riskLevel = "Low";
  }

  // Generate safe next steps based on risk
  const safeNextSteps: string[] = [];

  if (riskLevel === "High" || riskLevel === "Medium") {
    safeNextSteps.push("Do not click any links, open attachments, or download files from this message.");
    safeNextSteps.push("Never reply with passwords, OTPs, PINs, personal identification, or payment details.");
    safeNextSteps.push("If the message mentions an institution you use (e.g. bank, postal carrier, subscription), check your account directly using their official app or a trusted bookmark.");
    safeNextSteps.push("Block the sender and report the message as spam/phishing in your messaging app.");
  } else {
    safeNextSteps.push("Even when no obvious signs are detected, remain cautious if the message was unexpected.");
    safeNextSteps.push("If the sender asks for personal or financial action later, verify their identity independently through trusted official contact channels.");
    safeNextSteps.push("Do not enter login credentials on websites you reached by clicking links in messages.");
  }

  // Generate uncertainties
  const uncertainty: string[] = [
    "This automated review assesses language patterns only and cannot verify who actually sent the message or inspect the technical headers behind it.",
    "A clean evaluation does not guarantee a message is safe; sophisticated spear-phishing or compromised legitimate accounts may not display obvious keywords.",
  ];

  if (channel === "email") {
    uncertainty.push("Sender email addresses and display names can be spoofed; verifying the SPF/DKIM authentication in the raw email header is recommended.");
  } else if (channel === "sms" || channel === "whatsapp") {
    uncertainty.push("Caller IDs and sender names in text messages can be spoofed using VoIP or bulk messaging gateways.");
  }

  return {
    assessment,
    risk_level: riskLevel,
    warning_signs: foundSigns,
    safe_next_steps: safeNextSteps,
    uncertainty,
    detected_urls: detectedUrls,
    analyzed_at: new Date().toISOString(),
    channel,
    is_demo: true,
    demo_notice: "Generated by local heuristic rule engine (Demo / Fallback mode).",
  };
}
