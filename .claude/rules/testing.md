---
paths:
  - '**/*.test.{ts,tsx}'
  - 'vitest.config.ts'
  - 'vitest.setup.ts'
---

# Testing Rules (Vitest + Testing Library)

- Colocate tests next to the target file: `LoginForm.tsx` → `LoginForm.test.tsx`.
- Test user-visible behavior, not implementation details. Query by role/text (`getByRole`, `getByText`) — never by class name or test-id unless there's no accessible alternative.
- Use `@testing-library/user-event` for interactions, not `fireEvent`.
- Structure: `describe` per component/function, `it` names state the expected behavior in plain English.
- Run with `npm run test` (single run; `npm run test:watch` for watch mode).
- New features and bug fixes ship with tests; a bug fix starts with a failing test that reproduces it.
- Components using TanStack Query get a fresh `QueryClient` per test (wrap with a test `QueryClientProvider`; disable retries).
