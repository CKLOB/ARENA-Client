---
paths:
  - 'src/**/*.tsx'
---

# React / Next.js Rules

- **Server Components by default.** Add `'use client'` only when the component actually needs state, effects, event handlers, or browser APIs — and push it as far down the tree as possible.
- Components are function declarations: `export function LoginForm() {}`. Default exports only where Next.js requires them (`page.tsx`, `layout.tsx`, etc.).
- Component files are PascalCase (`LoginForm.tsx`); one component per file as a rule.
- Props: define a `Props` type per component (`type LoginFormProps = {...}`); destructure in the signature.
- Don't `useEffect` for derived state or data transformation — compute during render. Effects are for external system synchronization only.
- Data fetching: Server Components first; client-side server state goes through **TanStack Query** (`useQuery`/`useMutation`) — never `fetch` inside `useEffect`.
- Validate external data (API responses, form input, URL params) with **Zod** schemas at the boundary; infer types via `z.infer` instead of hand-writing them.
- Use `next/image` for images, `next/link` for internal navigation, `next/font` for fonts.
- Avoid prop drilling more than 2 levels — restructure with composition (children) first, context only if that fails.
- Never use array index as `key` for dynamic lists.
