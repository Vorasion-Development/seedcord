---
'@seedcord/gateway': minor
'@seedcord/core': minor
'@seedcord/types': minor
---

**BREAKING:** Plugin hooks, handler methods, and gate callbacks can now finish synchronously or asynchronously. Callers that expect a promise must use `await` or wrap the returned value in `Promise.resolve(...)` before chaining promise methods.
