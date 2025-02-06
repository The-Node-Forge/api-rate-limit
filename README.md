
<div align="center">
   
  # API Rate Limiter 
 [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

 </div>
 
A **simple and efficient API rate limiter** for JavaScript/TypeScript applications. This package helps developers **limit API requests per user**, preventing abuse and excessive usage.

## ✨ Features
- ✅ **Configurable Limits** – Set max requests per second, minute, or hour.
- ✅ **In-Memory Storage** – Fast and lightweight.
- ✅ **Express Middleware** – Easily integrate with Express.
- ✅ **Multiple Users** – Tracks each user separately.

---

## 📦 Installation
```sh
npm install @node-forge/rate-limiter
```

or using Yarn:
```sh
yarn add @node-forge/rate-limiter
```

---

## 🛠️ Basic Usage

### **1️⃣ 🌐 JavaScript/TypeScript Example**
Easily integrate with **JavaScript/TypeScript**.
```javascript
// Javascript
import RateLimiter from "@node-forge/rate-limiter";

// Create a rate limiter allowing 5 requests per minute
const limiter = new RateLimiter({ windowMs: 60000, maxRequests: 5 });

const userId = "user123"; // Could be an API key or IP

if (limiter.isAllowed(userId)) {
  console.log("Request allowed ✅");
} else {
  console.log("Too many requests ❌");
}
```

---

### 2️⃣ 🌐 Express Middleware Example - Global
Easily integrate with an **Express API**.

```typescript
import express from "express";
import { RateLimiter, rateLimitMiddleware } from "@node-forge/rate-limiter";

const app = express();

// Set up rate limiter (10 requests per minute)
const limiter = new RateLimiter({ windowMs: 60000, maxRequests: 10 });

// Apply middleware globally
app.use(rateLimitMiddleware(limiter));

app.get("/", (req, res) => {
  res.send("Welcome to my API!");
});

app.listen(3000, () => console.log("Server running on port 3000"));
```

---

### 3️⃣ 🌐 Express Middleware Example - Specific
Easily integrate with an **Express API**.

```typescript
import express from "express";
import { RateLimiter, rateLimitMiddleware } from "@node-forge/rate-limiter";

const app = express();

const limiterFiveReq = new RateLimiter({ windowMs: 60000, maxRequests: 5 });
const limiterTenReq = new RateLimiter({ windowMs: 60000, maxRequests: 10 });

// Apply rate limiting to only specific routes
app.get("/public", (req, res) => {
  res.send("This route has no rate limiting!");
});

// Apply rate limiting only to this route
app.get("/limited", rateLimitMiddleware(limiterFiveReq), (req, res) => {
  res.send("This route is rate-limited to 5 requests!");
});

app.post("/submit", rateLimitMiddleware(limiterTenReq), (req, res) => {
  res.send("This POST request is also rate-limited to ten requests!");
});

app.listen(3000, () => console.log("Server running on port 3000"));
```

---

## ✅ **API Reference**
### **RateLimiter Class**
```typescript
new RateLimiter({ windowMs: number, maxRequests: number })
```
| Parameter   | Type   | Description                                      |
|------------|--------|--------------------------------------------------|
| `windowMs` | `number` | Time window in milliseconds (e.g., `60000` for 1 minute) |
| `maxRequests` | `number` | Maximum allowed requests in the given window |

#### **Methods**
```typescript
isAllowed(userId: string): boolean
```
| Method      | Returns   | Description                                      |
|------------|----------|--------------------------------------------------|
| `isAllowed(userId)` | `boolean` | Returns `true` if the user is allowed to make a request, otherwise `false`. |

---

## 📜 **License**
MIT License.

---

## 💡 **Contributing**
Contributions are welcome! Please submit issues or pull requests.

---

## 🌟 **Support**
If you find this package useful, please consider giving it a ⭐ on GitHub!

---

## 🔗 **Links**
- 📦 [NPM Package](https://www.npmjs.com/package/@node-forge/rate-limiter) *(Replace with actual link)*
- 🏗 [GitHub Repo](https://github.com/The-Node-Forge/rate-limiter) *(Replace with actual link)*

