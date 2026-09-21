interface RateLimitRecord {
  count: number;
  resetTime: number;
}

const rateLimitMap = new Map<string, RateLimitRecord>();

// Clean up expired entries every 10 minutes
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [ip, record] of rateLimitMap.entries()) {
      if (now > record.resetTime) {
        rateLimitMap.delete(ip);
      }
    }
  }, 10 * 60 * 1000);
}

export function resetRateLimit(ip: string) {
  rateLimitMap.delete(ip);
}

/**
 * Checks if a given IP exceeds the allowed request limit within the window.
 * @param ip Client IP address
 * @param maxLimit Maximum requests allowed in window (default 15)
 * @param windowMs Window duration in milliseconds (default 10 minutes)
 */
export function checkRateLimit(
  ip: string,
  maxLimit: number = 15,
  windowMs: number = 10 * 60 * 1000
): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, {
      count: 1,
      resetTime: now + windowMs,
    });
    return {
      allowed: true,
      remaining: maxLimit - 1,
      resetTime: now + windowMs,
    };
  }

  if (record.count >= maxLimit) {
    return {
      allowed: false,
      remaining: 0,
      resetTime: record.resetTime,
    };
  }

  record.count += 1;
  return {
    allowed: true,
    remaining: maxLimit - record.count,
    resetTime: record.resetTime,
  };
}
