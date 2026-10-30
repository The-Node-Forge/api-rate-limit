import * as api from '../src';
import RateLimiter from '../src/RateLimiter';
import { rateLimitMiddleware } from '../src/middleware';

describe('public API surface', () => {
  test('exports exactly RateLimiter and rateLimitMiddleware', () => {
    expect(Object.keys(api).sort()).toEqual(['RateLimiter', 'rateLimitMiddleware']);
    expect(api.RateLimiter).toBe(RateLimiter);
    expect(api.rateLimitMiddleware).toBe(rateLimitMiddleware);
  });
});
