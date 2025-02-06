# Function: rateLimitMiddleware()

> **rateLimitMiddleware**(`limiter`): (`req`, `res`, `next`) => `undefined` \| `Response`

Defined in: [middleware.ts:19](https://github.com/The-Node-Forge/api-rate-limit/blob/80ce7d7b38f74cf2444ba0f4e8ff16bc2888907d/src/middleware.ts#L19)

Express middleware for rate limiting API requests.

## Parameters

### limiter

[`RateLimiter`](../classes/RateLimiter.md)

The rate limiter instance to use.

## Returns

`Function`

- Express middleware function.

### Parameters

#### req

`Request`

#### res

`Response`

#### next

`NextFunction`

### Returns

`undefined` \| `Response`
