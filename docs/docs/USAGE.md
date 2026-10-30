---
title: Usage
description: Basic example and config.
sidebar_position: 3
---

### Basic Example

```javascript
// ESM
import { RateLimiter, rateLimitMiddleware } from '@the-node-forge/api-rate-limit';

// CommonJs
const {
  RateLimiter,
  rateLimitMiddleware,
} = require('@the-node-forge/api-rate-limit');
```

### Configuration

```javascript
const app = express();

// Set up rate limiter (10 requests per minute)
const limiter = new RateLimiter({ windowMs: 60000, maxRequests: 10 });

// Apply middleware globally
app.use(rateLimitMiddleware(limiter));
```

---

**1️⃣ 🌐 JavaScript/TypeScript Example**

Easily integrate with **JavaScript/TypeScript**.

```javascript
// Javascript
import { RateLimiter } from '@the-node-forge/api-rate-limit';

// Create a rate limiter allowing 5 requests per minute
const limiter = new RateLimiter({ windowMs: 60000, maxRequests: 5 });

const userId = 'user123'; // Could be an API key or IP

if (limiter.isAllowed(userId)) {
  console.log('Request allowed ✅');
} else {
  console.log('Too many requests ❌');
}
```

---

**2️⃣ 🌐 Express Middleware Example - Global**

Easily integrate with an **Express API**.

```typescript
import express from 'express';
import { RateLimiter, rateLimitMiddleware } from '@the-node-forge/api-rate-limit';

const app = express();

// Set up rate limiter (10 requests per minute)
const limiter = new RateLimiter({ windowMs: 60000, maxRequests: 10 });

// Apply middleware globally
app.use(rateLimitMiddleware(limiter));

app.get('/', (req, res) => {
  res.send('Welcome to my API!');
});

app.listen(3000, () => console.log('Server running on port 3000'));
```

---

**3️⃣ 🌐 Express Middleware Example - Specific**

Easily integrate with an **Express API**.

```typescript
import express from 'express';
import { RateLimiter, rateLimitMiddleware } from '@the-node-forge/api-rate-limit';

const app = express();

const limiterFiveReq = new RateLimiter({ windowMs: 60000, maxRequests: 5 });
const limiterTenReq = new RateLimiter({ windowMs: 60000, maxRequests: 10 });

// Apply rate limiting to only specific routes
app.get('/public', (req, res) => {
  res.send('This route has no rate limiting!');
});

// Apply rate limiting only to this route
app.get('/limited', rateLimitMiddleware(limiterFiveReq), (req, res) => {
  res.send('This route is rate-limited to 5 requests!');
});

app.post('/submit', rateLimitMiddleware(limiterTenReq), (req, res) => {
  res.send('This POST request is also rate-limited to ten requests!');
});

app.listen(3000, () => console.log('Server running on port 3000'));
```

---

For API details, see [API_REFERENCE.md](API_REFERENCE.md).

---

## 🔒 Security Notes

- **Behind a proxy or load balancer**, `req.ip` is the proxy's address unless Express
  is told to trust it, so all users would share one limit. Set
  [`app.set('trust proxy', ...)`](https://expressjs.com/en/guide/behind-proxies.html)
  to the exact number of proxies in front of your app. Do not use `true` when clients
  can reach the app directly, since they can spoof `X-Forwarded-For` and dodge the
  limit.
- **State is in memory and per process.** Limits are not shared across multiple
  instances or restarts; use a shared store at the edge if you scale horizontally.
- **Invalid options throw.** `windowMs` must be a positive finite number and
  `maxRequests` a positive integer; otherwise the constructor throws a `RangeError`.
- **IPv6**: each address is limited separately, so one client with a whole `/64` can
  use many addresses. Key on an API key or user id where you can.

---

## ⭐ Support

If you find this package useful, please \*\*give it a ⭐ on
[GitHub](https://github.com/The-Node-Forge/api-rate-limit 'GitHub Repository')

---
