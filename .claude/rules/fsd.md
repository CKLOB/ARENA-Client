---
paths:
  - 'src/**'
---

# FSD Conventions

Layer rules (dependency direction, public API) are in CLAUDE.md. This file covers structure and naming inside slices.

## views layer — composition only, one file per slice

A view slice is **exactly one file**: `views/<name>/index.tsx`. It only composes components imported from `widgets`/`features`/`entities`/`shared` and lays them out.

```tsx
// views/signup/index.tsx — the entire slice
import { SignupForm } from '@/features/signup';
import { PageHeader } from '@/widgets/page-header';

export function SignupPage() {
  return (
    <main>
      <PageHeader />
      <SignupForm />
    </main>
  );
}
```

Not allowed in `views/`:

- extra files or segments (`ui/`, `model/`, `components/`, ...) — if a view needs its own component, that component belongs in `features` or `widgets`
- business logic, state management (`useState` beyond trivial layout state), API calls, form handling
- implementing UI primitives inline — import them from `shared/ui`

The matching `app/` route only re-exports the view:

```tsx
// app/signup/page.tsx
export { SignupPage as default } from '@/views/signup';
```

## Slice structure (widgets / features / entities)

Slices in these layers contain only the segments they need, plus a public API (`views` is the single-file exception above):

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
