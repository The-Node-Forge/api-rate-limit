---
title: Changelog
description: A detailed changelog.
sidebar_position: 5
---

### Unreleased

- Security: constructor throws `RangeError` on invalid `windowMs`/`maxRequests`
  instead of silently disabling limiting.
- Security: expired client keys are evicted so memory no longer grows without bound.
- Packaging: `express` is now an optional peer dependency.

### v1.0.0 - 2025-02-06

- Initial release

<!-- ### v1.0.1 - YYYY-MM-DD

- Bug fix -->
