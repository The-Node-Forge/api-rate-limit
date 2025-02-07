/**
 * Configuration options for the RateLimiter.
 *
 * @interface RateLimitOptions
 *
 * @example
 * // Example configuration for 5 requests per minute
 * const options: RateLimitOptions = {
 *   windowMs: 60000,
 *   maxRequests: 5
 * };
 */
export interface RateLimitOptions {
  /**
   * Time window in milliseconds (e.g., `60000` for 1 minute).
   */
  windowMs: number;

  /**
   * Maximum number of allowed requests per user within the time window.
   */
  maxRequests: number;
}

/**
 * A lightweight API rate limiter that tracks requests per user and enforces limits.
 *
 * @example
 * // Creating a new rate limiter with a 1-minute window and max 5 requests
 * const limiter = new RateLimiter({ windowMs: 60000, maxRequests: 5 });
 *
 * if (limiter.isAllowed("user123")) {
 *   console.log("Request allowed ✅");
 * } else {
 *   console.log("Too many requests ❌");
 * }
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
   *
   * @example
   * // Initialize with a 10-second window allowing 3 requests
   * const limiter = new RateLimiter({ windowMs: 10000, maxRequests: 3 });
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
   *
   * @example
   * // Checking if a user is allowed to make a request
   * if (limiter.isAllowed("user123")) {
   *   console.log("Request allowed ✅");
   * } else {
   *   console.log("Too many requests ❌");
   * }
   */

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
