import RateLimiter from '../RateLimiter';

describe('RateLimiter', () => {
  let rateLimiter: RateLimiter;

  beforeEach(() => {
    rateLimiter = new RateLimiter({ windowMs: 1000, maxRequests: 3 });
  });

  test('should allow requests within the limit', () => {
    const userId = 'user1';
    expect(rateLimiter.isAllowed(userId)).toBe(true);
    expect(rateLimiter.isAllowed(userId)).toBe(true);
    expect(rateLimiter.isAllowed(userId)).toBe(true);
  });

  test('should block requests exceeding the limit', () => {
    const userId = 'user1';
    rateLimiter.isAllowed(userId);
    rateLimiter.isAllowed(userId);
    rateLimiter.isAllowed(userId);
    expect(rateLimiter.isAllowed(userId)).toBe(false);
  });

  test('should reset after the time window', (done) => {
    const userId = 'user2';
    const timeoutValue = 1000;
    rateLimiter.isAllowed(userId);
    rateLimiter.isAllowed(userId);
    rateLimiter.isAllowed(userId);
    expect(rateLimiter.isAllowed(userId)).toBe(false);

    setTimeout(() => {
      expect(rateLimiter.isAllowed(userId)).toBe(true);
      done();
    }, timeoutValue);
  });

  test('should track multiple users independently', () => {
    const user1 = 'user1';
    const user2 = 'user2';

    rateLimiter.isAllowed(user1);
    rateLimiter.isAllowed(user1);
    rateLimiter.isAllowed(user1);
    expect(rateLimiter.isAllowed(user1)).toBe(false);

    expect(rateLimiter.isAllowed(user2)).toBe(true);
  });
});
