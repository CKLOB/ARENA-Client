---
paths:
  - '**/*.{ts,tsx}'
---

# TypeScript Rules

- `strict` mode is on — never weaken it. No `any`; use `unknown` + narrowing when the type is genuinely unknown.
- No non-null assertions (`!`) — handle the null case or restructure so it can't be null.
- No `as` type assertions except `as const`. If a cast seems necessary, fix the types instead.
- Prefer `type` over `interface` (use `interface` only for declaration merging).
- Let inference work: don't annotate what TypeScript already infers (locals, simple returns). Do annotate exported function signatures.
- Use `import type { ... }` for type-only imports.
- Model states with discriminated unions instead of multiple optional booleans.
- No `enum` — use `as const` object + union type instead.
- Every code change must pass `npx tsc --noEmit` before commit.
