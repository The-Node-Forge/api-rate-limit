[**api-rate-limit**](../README.md)

***

[api-rate-limit](../globals.md) / RateLimiter

# Class: RateLimiter

Defined in: [RateLimiter.ts:39](https://github.com/The-Node-Forge/api-rate-limit/blob/9a4f5eb06869e3581ab4dc6e5104a79aa9d01bdb/src/RateLimiter.ts#L39)

A lightweight API rate limiter that tracks requests per user and enforces limits.

## Example

```ts
// Creating a new rate limiter with a 1-minute window and max 5 requests
const limiter = new RateLimiter({ windowMs: 60000, maxRequests: 5 });

if (limiter.isAllowed("user123")) {
  console.log("Request allowed ✅");
} else {
  console.log("Too many requests ❌");
}
```

## Constructors

### new RateLimiter()

> **new RateLimiter**(`options`): [`RateLimiter`](RateLimiter.md)

Defined in: [RateLimiter.ts:69](https://github.com/The-Node-Forge/api-rate-limit/blob/9a4f5eb06869e3581ab4dc6e5104a79aa9d01bdb/src/RateLimiter.ts#L69)

Creates an instance of RateLimiter.

#### Parameters

##### options

`RateLimitOptions`

Configuration for the rate limiter.

#### Returns

[`RateLimiter`](RateLimiter.md)

#### Example

```ts
// Initialize with a 10-second window allowing 3 requests
const limiter = new RateLimiter({ windowMs: 10000, maxRequests: 3 });
```

## Methods

### isAllowed()

> **isAllowed**(`userId`): `boolean`

Defined in: [RateLimiter.ts:89](https://github.com/The-Node-Forge/api-rate-limit/blob/9a4f5eb06869e3581ab4dc6e5104a79aa9d01bdb/src/RateLimiter.ts#L89)

Checks whether a user is allowed to make a request.

#### Parameters

##### userId

`string`

The unique identifier for the user (e.g., IP address, API key).

#### Returns

`boolean`

- Returns `true` if the request is allowed, otherwise `false`.

#### Example

```ts
// Checking if a user is allowed to make a request
if (limiter.isAllowed("user123")) {
  console.log("Request allowed ✅");
} else {
  console.log("Too many requests ❌");
}
```
