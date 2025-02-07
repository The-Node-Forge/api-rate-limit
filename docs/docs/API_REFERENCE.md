---
title: API Reference
description: API parameters, returns, examples.
sidebar_position: 4
---

### `RateLimiter({windowMs, maxRequests})`

API rate limiter that tracks requests per user and enforces limits.

**Parameters:**

| Option        | Type     | Default | Description                                                         |
| ------------- | -------- | ------- | ------------------------------------------------------------------- |
| `windowMs`    | `number` | `60000` | Time window in milliseconds (e.g., `60000` for 1 minute).           |
| `maxRequests` | `number` | `5`     | Maximum number of allowed requests per user within the time window. |

**Example configuration:**

```typescript
const config = {
  windowMs: 60000, // 1 minute
  maxRequests: 10, // Max 10 requests per minute
};
```

**Returns:**

### **1️⃣ RateLimiter Class**

| Function                                 | Return Type              | Description                                                                                        |
| ---------------------------------------- | ------------------------ | -------------------------------------------------------------------------------------------------- |
| `isAllowed(userId: string)`              | `boolean`                | Returns `true` if the request is **allowed**, otherwise `false` if the **rate limit is exceeded**. |
| `constructor(options: RateLimitOptions)` | `RateLimiter` (instance) | Creates a new rate limiter instance using the provided configuration.                              |

---

### **2️⃣ Middleware Function**

| Function                                    | Return Type                                                 | Description                                                                                                                |
| ------------------------------------------- | ----------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `rateLimitMiddleware(limiter: RateLimiter)` | `(req: Request, res: Response, next: NextFunction) => void` | Express middleware that **enforces rate limits**. If the limit is exceeded, it returns a `429 Too Many Requests` response. |
