---
paths:
  - 'src/**'
---

# FSD Conventions

Layer rules (dependency direction, public API) are in CLAUDE.md. This file covers structure and naming inside slices.

## Slice structure

A slice contains only the segments it needs, plus a public API:

```
features/login/
├── ui/          # components (LoginForm.tsx)
├── model/       # state, business logic, types (useLogin.ts, types.ts)
├── api/         # slice-specific API calls (loginApi.ts)
├── lib/         # slice-internal helpers
└── index.ts     # public API — the ONLY entry point for other slices
```

- `index.ts` re-exports only what outsiders need. Keep the surface minimal — don't `export *`.
- Slice names are kebab-case and domain-oriented (`match-list`, `user-profile`), not technical (`utils`, `helpers`, `common`).

## Placement heuristics

- Used by one feature only → keep it inside that feature.
- A business concept referenced across features (types, model, base UI of a domain object) → `entities`.
- Domain-agnostic (button, date formatter, fetch wrapper) → `shared`.
- Composes multiple features/entities into a standalone page section → `widgets`.
- When unsure between two layers, pick the **lower** one — promoting later is cheaper than demoting.

## Imports

- Always use the `@/` alias for cross-slice imports; relative paths only within the same slice.
- Run `/fsd-check` after adding or moving slices.
