/**
 * In-process sliding-window limiter, sized for the MVP.
 *
 * Counters live in memory and are discarded when the process restarts, so a
 * multi-instance deployment limits per instance rather than globally. That is
 * an accepted trade-off here: it stops casual form flooding without adding a
 * Redis dependency. Swap `hits` for a shared store before scaling out.
 */

const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
/** Stops the map growing without bound in a long-lived process. */
const MAX_KEYS = 5_000;

const hits = new Map<string, number[]>();

export type RateLimitResult = { allowed: boolean; retryAfterMs: number };

export function rateLimit(key: string): RateLimitResult {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((at) => now - at < WINDOW_MS);

  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(key, recent);
    return { allowed: false, retryAfterMs: WINDOW_MS - (now - recent[0]) };
  }

  recent.push(now);
  hits.set(key, recent);

  if (hits.size > MAX_KEYS) {
    for (const [existing, times] of Array.from(hits.entries())) {
      if (times.every((at: number) => now - at >= WINDOW_MS)) hits.delete(existing);
    }
  }

  return { allowed: true, retryAfterMs: 0 };
}

/**
 * Best-effort client identity from proxy headers. It is not authentication and
 * is never stored — it exists only as a rate-limit bucket.
 */
export function clientKey(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || headers.get("x-real-ip") || "unknown";
  return ip.slice(0, 64);
}
