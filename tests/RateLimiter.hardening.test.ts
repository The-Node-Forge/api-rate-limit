import RateLimiter from '../src/RateLimiter';

describe('RateLimiter option validation', () => {
  test.each([
    ['NaN windowMs', { windowMs: NaN, maxRequests: 1 }],
    ['zero windowMs', { windowMs: 0, maxRequests: 1 }],
    ['negative windowMs', { windowMs: -1, maxRequests: 1 }],
    ['Infinity windowMs', { windowMs: Infinity, maxRequests: 1 }],
    ['NaN maxRequests', { windowMs: 1000, maxRequests: NaN }],
    ['zero maxRequests', { windowMs: 1000, maxRequests: 0 }],
    ['negative maxRequests', { windowMs: 1000, maxRequests: -5 }],
    ['fractional maxRequests', { windowMs: 1000, maxRequests: 1.5 }],
  ])('rejects %s', (_name, options) => {
    expect(() => new RateLimiter(options)).toThrow(RangeError);
  });

  test('accepts valid options', () => {
    expect(() => new RateLimiter({ windowMs: 1, maxRequests: 1 })).not.toThrow();
  });
});

const CLIENT_COUNT = 100;
const WINDOW_MS = 1000;
const PAST_WINDOW_MS = WINDOW_MS + 1;
const PARTIAL_MS = 600;
const JUST_BEFORE_MS = WINDOW_MS - 1;
const REMAINING_KEYS = 2;

describe('RateLimiter memory behaviour', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  const size = (limiter: RateLimiter) =>
    (limiter as unknown as { requests: Map<string, number[]> }).requests.size;

  test('evicts keys whose requests have all expired', () => {
    const limiter = new RateLimiter({ windowMs: 1000, maxRequests: 2 });

    for (let i = 0; i < CLIENT_COUNT; i++) limiter.isAllowed(`ip-${i}`);
    expect(size(limiter)).toBe(CLIENT_COUNT);

    jest.advanceTimersByTime(PAST_WINDOW_MS);
    limiter.isAllowed('fresh');

    expect(size(limiter)).toBe(1);
  });

  test('keeps keys that are still inside the window', () => {
    const limiter = new RateLimiter({ windowMs: 1000, maxRequests: 1 });
    limiter.isAllowed('a');
    jest.advanceTimersByTime(PARTIAL_MS);
    limiter.isAllowed('b');
    jest.advanceTimersByTime(PARTIAL_MS);

    limiter.isAllowed('c');

    expect(size(limiter)).toBe(REMAINING_KEYS); // 'a' expired, 'b' and 'c' remain
    expect(limiter.isAllowed('b')).toBe(false);
  });

  test('allows a request again exactly when the window elapses', () => {
    const limiter = new RateLimiter({ windowMs: 1000, maxRequests: 1 });
    expect(limiter.isAllowed('a')).toBe(true);
    jest.advanceTimersByTime(JUST_BEFORE_MS);
    expect(limiter.isAllowed('a')).toBe(false);
    jest.advanceTimersByTime(1);
    expect(limiter.isAllowed('a')).toBe(true);
  });
});
