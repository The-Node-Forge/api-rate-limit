import { Request, Response, NextFunction } from 'express';

import RateLimiter from './RateLimiter';

const HTTP_STATUS = {
  TOO_MANY_REQUESTS: 429,
};


export const rateLimitMiddleware = (limiter: RateLimiter) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userId: string = req.ip || '';

    if (!limiter.isAllowed(userId)) {
      return res
        .status(HTTP_STATUS.TOO_MANY_REQUESTS)
        .json({ message: 'Too many requests, please try again later.' });
    }

    next();
  };
};
