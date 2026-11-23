interface RateLimitRecord {
  timestamps: number[];
}

// In-memory store for rate limiting by client IP
const ipRequestMap = new Map<string, RateLimitRecord>();

// Clean up stale entries every 5 minutes to prevent memory leaks
const CLEANUP_INTERVAL_MS = 5 * 60 * 1000;
let lastCleanup = Date.now();

function performCleanup(windowMs: number) {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL_MS) return;
  lastCleanup = now;

  const threshold = now - windowMs;
  ipRequestMap.forEach((record, ip) => {
    record.timestamps = record.timestamps.filter((t) => t > threshold);
    if (record.timestamps.length === 0) {
      ipRequestMap.delete(ip);
    }
  });
}

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  resetSeconds: number;
}

/**
 * Checks whether an IP address has exceeded the rate limit.
 * Uses a sliding window algorithm.
 */
export function checkRateLimit(
  clientIp: string,
  maxRequests: number = 10,
  windowSeconds: number = 60
): RateLimitResult {
  const now = Date.now();
  const windowMs = windowSeconds * 1000;

  performCleanup(windowMs);

  let record = ipRequestMap.get(clientIp);
  if (!record) {
    record = { timestamps: [] };
    ipRequestMap.set(clientIp, record);
  }

  // Filter timestamps within the current sliding window
  const threshold = now - windowMs;
  record.timestamps = record.timestamps.filter((t) => t > threshold);

  if (record.timestamps.length >= maxRequests) {
    const oldest = record.timestamps[0];
    const resetSeconds = Math.max(1, Math.ceil((oldest + windowMs - now) / 1000));
    return {
      success: false,
      limit: maxRequests,
      remaining: 0,
      resetSeconds,
    };
  }

  // Record this request
  record.timestamps.push(now);

  return {
    success: true,
    limit: maxRequests,
    remaining: maxRequests - record.timestamps.length,
    resetSeconds: windowSeconds,
  };
}
