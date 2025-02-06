import { Request, Response, NextFunction } from "express";
import RateLimiter from "./RateLimiter";

export const rateLimitMiddleware = (limiter: RateLimiter) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // api key or Ip address...
    const userId = req.ip || ''; 
    if (!limiter.isAllowed(userId)) {
      return res.status(429).json({ message: "Too many requests, please try again later." });
    }
    next();
  };
};
