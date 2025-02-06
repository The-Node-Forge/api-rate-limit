import { Request, Response, NextFunction } from 'express';

import RateLimiter from './RateLimiter';


const HTTP_STATUS = {
  TOO_MANY_REQUESTS: 429,
};


/**
 * Express middleware for rate limiting API requests.
 *
 * @param {RateLimiter} limiter - The rate limiter instance to use.
 * @returns {(req: Request, res: Response, next: NextFunction) => void} Express middleware function.
 *
 * @example
 * ```typescript
 * import express from "express";
 * import RateLimiter, { rateLimitMiddleware } from "./RateLimiter";
 *
 * const app = express();
 * const limiter = new RateLimiter({ windowMs: 60000, maxRequests: 5 });
 *
 * app.use(rateLimitMiddleware(limiter));
 *
 * app.get("/", (req, res) => {
 *   res.send("Welcome to my API!");
 * });
 *
 * app.listen(3000, () => console.log("Server running on port 3000"));
 * ```
 */

export const rateLimitMiddleware = (limiter: RateLimiter) => {
  /**
   * Middleware function to enforce rate limiting.
   *
   * @param {Request} req - The Express request object.
   * @param {Response} res - The Express response object.
   * @param {NextFunction} next - The Express next function to proceed to the next middleware.
   *
   * @example
   * // Example usage in an Express route:
   * app.use(rateLimitMiddleware(limiter));
   */
  return (req: Request, res: Response, next: NextFunction) => {
    /**
     * Unique user identifier, typically the IP address.
     * @type {string}
     */
    const userId: string = req.ip || "";

    if (!limiter.isAllowed(userId)) {
      return res
        .status(HTTP_STATUS.TOO_MANY_REQUESTS)
        .json({ message: "Too many requests, please try again later." });
    }

    next();
  };
};

