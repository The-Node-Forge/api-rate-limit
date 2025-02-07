[**api-rate-limit**](../README.md)

---

[api-rate-limit](../globals.md) / rateLimitMiddleware

# Function: rateLimitMiddleware()

> **rateLimitMiddleware**(`limiter`): (`req`, `res`, `next`) => `undefined` \|
> `Response`

Defined in:
[middleware.ts:10](https://github.com/The-Node-Forge/api-rate-limit/blob/27461bb116b45b7bfe4ba40bd7b5279fc762fad7/src/middleware.ts#L10)

## Parameters

### limiter

[`RateLimiter`](../classes/RateLimiter.md)

## Returns

`Function`

### Parameters

#### req

`Request`

#### res

`Response`

#### next

`NextFunction`

### Returns

`undefined` \| `Response`
