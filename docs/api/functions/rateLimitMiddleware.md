[**api-rate-limit**](../README.md)

---

[api-rate-limit](../globals.md) / rateLimitMiddleware

# Function: rateLimitMiddleware()

> **rateLimitMiddleware**(`limiter`): (`req`, `res`, `next`) => `undefined` \|
> `Response`

Defined in:
[middleware.ts:35](https://github.com/The-Node-Forge/api-rate-limit/blob/726eba219c7ae3e0fc64d9c308da4556afdfe5b3/src/middleware.ts#L35)

Express middleware for rate limiting API requests.

## Parameters

### limiter

[`RateLimiter`](../classes/RateLimiter.md)

The rate limiter instance to use.

## Returns

`Function`

Express middleware function.

### Parameters

#### req

`Request`

#### res

`Response`

#### next

`NextFunction`

### Returns

`undefined` \| `Response`

## Example

```typescript
import express from 'express';
import RateLimiter, { rateLimitMiddleware } from './RateLimiter';

const app = express();
const limiter = new RateLimiter({ windowMs: 60000, maxRequests: 5 });

app.use(rateLimitMiddleware(limiter));

app.get('/', (req, res) => {
  res.send('Welcome to my API!');
});

app.listen(3000, () => console.log('Server running on port 3000'));
```
