/**
 * @typedef {Object} RateLimitOptions
 * @property {number} windowMs - Time window in milliseconds (e.g., 60000 for 1 minute).
 * @property {number} maxRequests - Maximum number of allowed requests within the time window.
 */
type RateLimitOptions = {
  windowMs: number;
  maxRequests: number;
};

/**
 * A lightweight API rate limiter that tracks requests per user and enforces limits.
 */
class RateLimiter {
  /**
   * A map storing request timestamps for each user.
   * @private
   * @type {Map<string, number[]>}
   */
  private requests: Map<string, number[]>;

  /**
   * The time window in milliseconds for the rate limiter.
   * @private
   * @type {number}
   */
  private windowMs: number;

  /**
   * The maximum number of allowed requests within the specified time window.
   * @private
   * @type {number}
   */
  private maxRequests: number;

  /**
   * Creates an instance of RateLimiter.
   * @param {RateLimitOptions} options - Configuration for the rate limiter.
   */
  constructor(options: RateLimitOptions) {
    this.windowMs = options.windowMs;
    this.maxRequests = options.maxRequests;
    this.requests = new Map();
  }

  /**
   * Checks whether a user is allowed to make a request.
   * @param {string} userId - The unique identifier for the user (e.g., IP address, API key).
   * @returns {boolean} - Returns `true` if the request is allowed, otherwise `false`.
   */
  isAllowed(userId: string): boolean {
    const now = Date.now();
    const timestamps = this.requests.get(userId) || [];

    const filteredTimestamps = timestamps.filter((timestamp) => now - timestamp < this.windowMs);

    if (filteredTimestamps.length >= this.maxRequests) {
      return false;
    }

    filteredTimestamps.push(now);
    this.requests.set(userId, filteredTimestamps);
    return true;
  }
}

export default RateLimiter;
