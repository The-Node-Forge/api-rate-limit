# 🚀 Lightweight API Rate Limiter

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

### **1️⃣ Import & Use in JavaScript/TypeScript**
```typescript
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

## 🌐 Express Middleware Example
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

## 🔍 **Testing**
Ensure the rate limiter works as expected with **Jest**.

### **1️⃣ Install Jest**
```sh
npm install --save-dev jest @types/jest ts-jest
```

### **2️⃣ Create a test file**
📂 `src/tests/RateLimiter.test.ts`

```typescript
import RateLimiter from "../RateLimiter";

describe("RateLimiter", () => {
  let rateLimiter: RateLimiter;

  beforeEach(() => {
    rateLimiter = new RateLimiter({ windowMs: 1000, maxRequests: 3 }); // 3 requests per second
  });

  test("should allow requests within the limit", () => {
    const userId = "user1";
    expect(rateLimiter.isAllowed(userId)).toBe(true);
    expect(rateLimiter.isAllowed(userId)).toBe(true);
    expect(rateLimiter.isAllowed(userId)).toBe(true);
  });

  test("should block requests exceeding the limit", () => {
    const userId = "user1";
    rateLimiter.isAllowed(userId);
    rateLimiter.isAllowed(userId);
    rateLimiter.isAllowed(userId);
    expect(rateLimiter.isAllowed(userId)).toBe(false);
  });

  test("should reset after the time window", (done) => {
    const userId = "user2";
    rateLimiter.isAllowed(userId);
    rateLimiter.isAllowed(userId);
    rateLimiter.isAllowed(userId);
    expect(rateLimiter.isAllowed(userId)).toBe(false);

    setTimeout(() => {
      expect(rateLimiter.isAllowed(userId)).toBe(true);
      done();
    }, 1000);
  });

  test("should track multiple users independently", () => {
    const user1 = "user1";
    const user2 = "user2";

    rateLimiter.isAllowed(user1);
    rateLimiter.isAllowed(user1);
    rateLimiter.isAllowed(user1);
    expect(rateLimiter.isAllowed(user1)).toBe(false);

    expect(rateLimiter.isAllowed(user2)).toBe(true);
  });
});
```

### **3️⃣ Run the Tests**
Add this script to `package.json`:
```json
"scripts": {
  "test": "jest"
}
```
Then run:
```sh
npm test
```

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

