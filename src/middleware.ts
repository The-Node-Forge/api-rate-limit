import { Request, Response, NextFunction } from 'express';

import RateLimiter from './RateLimiter';

/**
 * HTTP status codes for common API responses.
 * @enum {number}
 */
const HTTP_STATUS = {
  TOO_MANY_REQUESTS: 429,
};

/**
 * Express middleware for rate limiting API requests.
 *
 * @param {RateLimiter} limiter - The rate limiter instance to use.
 * @returns {(req: Request, res: Response, next: NextFunction) => void} - Express middleware function.
 */
export const rateLimitMiddleware = (limiter: RateLimiter) => {
  /**
   * Middleware function to enforce rate limiting.
   *
   * @param {Request} req - The Express request object.
   * @param {Response} res - The Express response object.
   * @param {NextFunction} next - The Express next function to proceed to the next middleware.
   */
  return (req: Request, res: Response, next: NextFunction) => {
    /**
     * Unique user identifier, typically the IP address.
     * @type {string}
     */
    const userId: string = req.ip || '';

    if (!limiter.isAllowed(userId)) {
      return res
        .status(HTTP_STATUS.TOO_MANY_REQUESTS)
        .json({ message: 'Too many requests, please try again later.' });
    }

    next();
  };
};
