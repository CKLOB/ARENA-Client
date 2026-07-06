---
name: fsd-check
description: Check for FSD (Feature-Sliced Design) architecture violations — layer dependency direction, cross-slice imports, public API bypasses. Use for code review or architecture audits.
---

# FSD Architecture Check Skill

Scan all of `src/` (or the path/diff given as an argument) for FSD rule violations.

## Layer Order (imports allowed top → bottom only)

```
app → views → widgets → features → entities → shared
```

## Checks

For each check, collect `import ... from '@/...'` statements and relative imports via Grep, then evaluate.

### 1. Upward imports (critical)

A lower layer importing from an upper layer.

- e.g. `src/shared/**` importing `@/features/...`
- e.g. `src/entities/**` importing `@/widgets/...`

### 2. Cross-slice imports within a layer (critical)

Importing a different slice in the same layer.

- e.g. `src/features/login/**` importing `@/features/search`
- Suggested fix: move the shared code down to `entities` or `shared`.

### 3. Public API bypass (warning)

Importing another slice's internal files directly (bypassing `index.ts`).

- Bad: `@/features/login/ui/LoginForm`
- Good: `@/features/login`

### 4. Bloated app layer (warning)

Business logic or complex components implemented directly in `src/app/` (Next.js routing). Page implementations belong in `views/`; `app/` should only re-export. (`layout.tsx`, `globals.css`, and metadata definitions are exempt.)

### 5. Missing index.ts in a slice (info)

A slice directory under `views/widgets/features/entities` lacking a public API (`index.ts`).

## Report Format

List violations ordered by severity:

```
### Critical (fix immediately)
- `src/entities/user/model/store.ts:12` — entities imports features/auth (upward)
  → Fix: ...

### Warning
- ...

### Info
- ...
```

If there are no violations, report "No FSD violations found" along with the number of files checked.
If the user did not ask for fixes, only report — do not modify code.
