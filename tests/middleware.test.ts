import { Request, Response, NextFunction } from 'express';

import { RateLimiter, rateLimitMiddleware } from '../src';

const TOO_MANY_REQUESTS = 429;
const TWO_CALLS = 2;

const mockRes = () => {
  const res = {} as Response;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const mockReq = (ip: string | undefined) => ({ ip }) as Request;

describe('rateLimitMiddleware', () => {
  let next: jest.MockedFunction<NextFunction>;

  beforeEach(() => {
    next = jest.fn();
  });

  test('calls next() and does not respond when under the limit', () => {
    const middleware = rateLimitMiddleware(
      new RateLimiter({ windowMs: 1000, maxRequests: 1 }),
    );
    const res = mockRes();

    middleware(mockReq('1.1.1.1'), res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(res.status).not.toHaveBeenCalled();
  });

  test('responds 429 with a JSON message and skips next() when over the limit', () => {
    const middleware = rateLimitMiddleware(
      new RateLimiter({ windowMs: 1000, maxRequests: 1 }),
    );
    middleware(mockReq('1.1.1.1'), mockRes(), next);
    next.mockClear();
    const res = mockRes();

    middleware(mockReq('1.1.1.1'), res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(TOO_MANY_REQUESTS);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Too many requests, please try again later.',
    });
  });

  test('limits each client IP independently', () => {
    const middleware = rateLimitMiddleware(
      new RateLimiter({ windowMs: 1000, maxRequests: 1 }),
    );
    middleware(mockReq('1.1.1.1'), mockRes(), next);
    const res = mockRes();

    middleware(mockReq('2.2.2.2'), res, next);

    expect(res.status).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledTimes(TWO_CALLS);
  });

  test('requests without an IP share one bucket instead of bypassing the limit', () => {
    const middleware = rateLimitMiddleware(
      new RateLimiter({ windowMs: 1000, maxRequests: 1 }),
    );
    middleware(mockReq(undefined), mockRes(), next);
    const res = mockRes();

    middleware(mockReq(undefined), res, next);

    expect(res.status).toHaveBeenCalledWith(TOO_MANY_REQUESTS);
  });

  test('separate limiter instances do not share state', () => {
    const a = rateLimitMiddleware(
      new RateLimiter({ windowMs: 1000, maxRequests: 1 }),
    );
    const b = rateLimitMiddleware(
      new RateLimiter({ windowMs: 1000, maxRequests: 1 }),
    );
    a(mockReq('1.1.1.1'), mockRes(), next);
    const res = mockRes();

    b(mockReq('1.1.1.1'), res, next);

    expect(res.status).not.toHaveBeenCalled();
  });
});
