export interface RateLimitOptions {
  windowMs: number;
  maxRequests: number;
}

class RateLimiter {
  private requests: Map<string, number[]>;
  private windowMs: number;
  private maxRequests: number;

  constructor(options: RateLimitOptions) {
    this.windowMs = options.windowMs;
    this.maxRequests = options.maxRequests;
    this.requests = new Map();
  }

  isAllowed(userId: string): boolean {
    const now = Date.now();
    const timestamps = this.requests.get(userId) || [];

    const filteredTimestamps = timestamps.filter(
      (timestamp) => now - timestamp < this.windowMs,
    );

    if (filteredTimestamps.length >= this.maxRequests) {
      return false;
    }

    filteredTimestamps.push(now);
    this.requests.set(userId, filteredTimestamps);
    return true;
  }
}

export default RateLimiter;
