# Function: rateLimitMiddleware()

> **rateLimitMiddleware**(`limiter`): (`req`, `res`, `next`) => `undefined` \| >
> `Response`

Defined in:
[middleware.ts:35](https://github.com/The-Node-Forge/api-rate-limit/blob/9a4f5eb06869e3581ab4dc6e5104a79aa9d01bdb/src/middleware.ts#L35)

Express middleware for rate limiting API requestss.

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
