# Security Policy

## Supported Versions

Only the latest published `1.x` release of `@the-node-forge/api-rate-limit`
receives security fixes.

## Reporting a Vulnerability

Please **do not open a public issue** for security problems.

Report privately through GitHub:
[Report a vulnerability](https://github.com/The-Node-Forge/api-rate-limit/security/advisories/new)

Include the affected version, a description of the impact, and steps or a
proof of concept to reproduce it. You can expect an acknowledgement within a
few days. Confirmed issues are fixed in a patch release and credited in the
advisory unless you prefer otherwise.

## Scope

In scope: bypassing or disabling the limiter, unbounded resource use, and
vulnerabilities in published dependencies.

Out of scope: limits being shared or bypassed because of deployment setup, such
as a missing Express `trust proxy` setting or running multiple instances (the
store is in memory and per process). See the Security Notes in the README.
