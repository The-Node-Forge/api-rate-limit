# Class: RateLimiter

Defined in: [RateLimiter.ts:14](https://github.com/The-Node-Forge/api-rate-limit/blob/80ce7d7b38f74cf2444ba0f4e8ff16bc2888907d/src/RateLimiter.ts#L14)

A lightweight API rate limiter that tracks requests per user and enforces limits.

## Constructors

### new RateLimiter()

> **new RateLimiter**(`options`): [`RateLimiter`](RateLimiter.md)

Defined in: [RateLimiter.ts:40](https://github.com/The-Node-Forge/api-rate-limit/blob/80ce7d7b38f74cf2444ba0f4e8ff16bc2888907d/src/RateLimiter.ts#L40)

Creates an instance of RateLimiter.

#### Parameters

##### options

`RateLimitOptions`

Configuration for the rate limiter.

#### Returns

[`RateLimiter`](RateLimiter.md)

## Methods

### isAllowed()

> **isAllowed**(`userId`): `boolean`

Defined in: [RateLimiter.ts:51](https://github.com/The-Node-Forge/api-rate-limit/blob/80ce7d7b38f74cf2444ba0f4e8ff16bc2888907d/src/RateLimiter.ts#L51)

Checks whether a user is allowed to make a request.

#### Parameters

##### userId

`string`

The unique identifier for the user (e.g., IP address, API key).

#### Returns

`boolean`

- Returns `true` if the request is allowed, otherwise `false`.
