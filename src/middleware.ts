import { Request, Response, NextFunction } from "express";
import RateLimiter from "./RateLimiter";

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
      return res.status(429).json({ message: "Too many requests, please try again later." });
    }

    next();
  };
};
