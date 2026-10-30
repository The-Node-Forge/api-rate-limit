---
title: Changelog
description: A detailed changelog.
sidebar_position: 5
---

### v1.1.0 - 2026-10-30

- Security: constructor throws `RangeError` on invalid `windowMs`/`maxRequests`
  instead of silently disabling limiting.
- Security: expired client keys are evicted so memory no longer grows without bound.
- Packaging: `express` is now an optional peer dependency (it was only used for
  types), which removes its transitive advisories from consumers' installs.
- Packaging: added a `types` condition to `exports`.
- Note: v1.0.8 was published to npm from outside this repository's history; v1.1.0
  supersedes it.

### v1.0.0 - 2025-02-06

- Initial release

<!-- ### v1.0.1 - YYYY-MM-DD

- Bug fix -->
