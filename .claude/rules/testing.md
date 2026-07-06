---
paths:
  - '**/*.test.{ts,tsx}'
  - 'e2e/**'
  - 'vitest.config.ts'
  - 'playwright.config.ts'
---

# Testing Rules

## Unit tests (Vitest + Testing Library)

- Colocate tests next to the target file: `LoginForm.tsx` → `LoginForm.test.tsx`.
- Test user-visible behavior, not implementation details. Query by role/text (`getByRole`, `getByText`) — never by class name or test-id unless there's no accessible alternative.
- Use `@testing-library/user-event` for interactions, not `fireEvent`.
- Structure: `describe` per component/function, `it` names state the expected behavior in plain English.
- Run with `npm run test -- run` (no watch mode) when verifying.
- New features and bug fixes ship with tests; a bug fix starts with a failing test that reproduces it.

## E2E tests (Playwright)

- Live in `e2e/`, cover critical user flows only (not every edge case — that's unit-test territory).
- Use Playwright locators by role/label; avoid brittle CSS selectors.
- No fixed `waitForTimeout` — rely on auto-waiting and web-first assertions (`expect(locator).toBeVisible()`).
