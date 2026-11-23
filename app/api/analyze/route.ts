import { NextRequest, NextResponse } from "next/server";
import { analyzeRequestSchema } from "@/types/analysis";
import { checkRateLimit } from "@/lib/rate-limiter";
import { executeAnalysis } from "@/lib/ai";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    // 1. Rate Limiting Check
    const forwardedFor = request.headers.get("x-forwarded-for");
    const realIp = request.headers.get("x-real-ip");
    const clientIp = forwardedFor ? forwardedFor.split(",")[0].trim() : realIp || "127.0.0.1";

    const maxRequests = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || "10", 10);
    const windowSeconds = parseInt(process.env.RATE_LIMIT_WINDOW_SECONDS || "60", 10);

    const rateLimit = checkRateLimit(clientIp, maxRequests, windowSeconds);

    if (!rateLimit.success) {
      return NextResponse.json(
        {
          error: "Too Many Requests",
          message: `Rate limit exceeded. Please wait ${rateLimit.resetSeconds} second(s) before analyzing another message.`,
          reset_seconds: rateLimit.resetSeconds,
        },
        {
          status: 429,
          headers: {
            "Retry-After": rateLimit.resetSeconds.toString(),
            "X-RateLimit-Limit": rateLimit.limit.toString(),
            "X-RateLimit-Remaining": "0",
          },
        }
      );
    }

    // 2. Parse & Validate Payload
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          error: "Invalid JSON",
          message: "Request body must be valid JSON.",
        },
        { status: 400 }
      );
    }

    const validationResult = analyzeRequestSchema.safeParse(body);
    if (!validationResult.success) {
      const issue = validationResult.error.issues[0];
      return NextResponse.json(
        {
          error: "Validation Error",
          message: issue?.message || "Invalid input parameters.",
        },
        { status: 400 }
      );
    }

    const { message, channel } = validationResult.data;

    // 3. Execute Analysis (AI or Fallback Heuristic)
    // IMPORTANT: We intentionally do NOT log message contents or credentials
    const execution = await executeAnalysis(message, channel);

    // 4. Return Structured Result
    return NextResponse.json(
      {
        success: true,
        data: execution.result,
        meta: {
          provider: execution.provider,
          is_demo: execution.isDemo,
          setup_notice: execution.setupNotice,
        },
      },
      {
        status: 200,
        headers: {
          "X-RateLimit-Limit": rateLimit.limit.toString(),
          "X-RateLimit-Remaining": rateLimit.remaining.toString(),
        },
      }
    );
  } catch (error) {
    // Return safe, sanitized error response
    return NextResponse.json(
      {
        error: "Internal Server Error",
        message: "An unexpected error occurred while analyzing the message. Please try again.",
      },
      { status: 500 }
    );
  }
}
