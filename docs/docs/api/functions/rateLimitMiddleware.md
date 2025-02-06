# Function: rateLimitMiddleware()

> **rateLimitMiddleware**(`limiter`): (`req`, `res`, `next`) => `undefined` \| `Response`

Defined in: [middleware.ts:19](https://github.com/The-Node-Forge/api-rate-limit/blob/2be04ef761b483dc7cf5e8f18ebf189fa72b08f9/src/middleware.ts#L19)

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
