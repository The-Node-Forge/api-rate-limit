export interface RateLimitOptions {
  /** Length of the sliding window in milliseconds. Must be a positive finite number. */
  windowMs: number;
  /** Maximum requests allowed per key within the window. Must be a positive integer. */
  maxRequests: number;
}

class RateLimiter {
  private requests: Map<string, number[]>;
  private windowMs: number;
  private maxRequests: number;
  private lastSweep: number;

  /**
   * @throws {RangeError} If `windowMs` or `maxRequests` are not positive numbers.
   * Invalid values such as `NaN` would otherwise silently disable limiting.
   */
  constructor(options: RateLimitOptions) {
    if (!Number.isFinite(options.windowMs) || options.windowMs <= 0) {
      throw new RangeError('windowMs must be a positive finite number');
    }
    if (!Number.isInteger(options.maxRequests) || options.maxRequests <= 0) {
      throw new RangeError('maxRequests must be a positive integer');
    }

    this.windowMs = options.windowMs;
    this.maxRequests = options.maxRequests;
    this.requests = new Map();
    this.lastSweep = Date.now();
  }

  /**
   * Records a request for `userId` and reports whether it is within the limit.
   */
  isAllowed(userId: string): boolean {
    const now = Date.now();
    this.sweep(now);

    const timestamps = this.requests.get(userId) || [];

    const filteredTimestamps = timestamps.filter(
      (timestamp) => now - timestamp < this.windowMs,
    );

    if (filteredTimestamps.length >= this.maxRequests) {
      this.requests.set(userId, filteredTimestamps);
      return false;
    }

    filteredTimestamps.push(now);
    this.requests.set(userId, filteredTimestamps);
    return true;
  }

  /**
   * Drops keys whose requests have all expired, at most once per window, so
   * the map cannot grow without bound when many distinct clients each send a
   * single request.
   */
  private sweep(now: number): void {
    if (now - this.lastSweep < this.windowMs) return;
    this.lastSweep = now;

    for (const [key, timestamps] of this.requests) {
      const latest = timestamps[timestamps.length - 1];
      if (latest === undefined || now - latest >= this.windowMs) {
        this.requests.delete(key);
      }
    }
  }
}

export default RateLimiter;
