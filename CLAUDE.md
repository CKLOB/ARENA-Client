# ARENA-Client

Frontend built with Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS 4.
Follows **FSD (Feature-Sliced Design)** architecture.

## Commands

| Task           | Command                              |
| -------------- | ------------------------------------ |
| Dev server     | `npm run dev`                        |
| Build          | `npm run build`                      |
| Lint           | `npm run lint`                       |
| Format         | `npm run format` / `format:check`    |
| Type check     | `npx tsc --noEmit`                   |
| Unit tests     | `npm run test -- run` (no watch)     |
| Unit test UI   | `npm run test:ui`                    |
| E2E tests      | `npm run e2e` (Playwright)           |

- Node >= 20.9.0, path alias `@/*` → `./src/*`
- The pre-commit hook (husky) runs ESLint/Prettier via lint-staged automatically.

## FSD Architecture

Layer structure under `src/`. **Upper layers may only import from lower layers** (no reverse imports, no cross-slice imports within the same layer).

```
src/
├── app/        # Next.js App Router (routing only, keep thin — re-export from views)
├── views/      # Page composition layer (FSD's "pages" — renamed to avoid Next.js conflict)
├── widgets/    # Large standalone UI blocks (header, sidebar, etc.)
├── features/   # User-action-level features (like, search, login form, etc.)
├── entities/   # Business entities (user, match, team, etc.)
└── shared/     # Shared code (no domain knowledge)
    ├── ui/     # Design-system-like shared components
    ├── lib/    # Utilities, hooks
    ├── api/    # API client, fetch wrappers
    └── config/ # Constants, configuration
```

### Rules

1. **Layer dependency direction**: `app → views → widgets → features → entities → shared`. Never import upward.
2. **No cross-slice imports within the same layer** (e.g. `features/login` must not import `features/search`). If code needs sharing, move it to a lower layer.
3. **Public API**: each slice exposes itself only through `index.ts`. Never import a slice's internal files directly.
   - Good: `import { LoginForm } from '@/features/login'`
   - Bad: `import { LoginForm } from '@/features/login/ui/LoginForm'`
4. **Segments inside a slice**: use only what's needed among `ui/`, `model/`, `api/`, `lib/`.
5. No business logic in `src/app/` (Next.js routing). Implement page components in `views/` and only import them from `app/`.
6. **`views/` is composition-only**: each view slice is a single `index.tsx` that only assembles widgets/features/entities/shared components. No business logic, no state management, no API calls, no standalone UI implementation in `views/` — anything reusable or logic-bearing lives in a lower layer and gets imported.
   ```
   views/signup/index.tsx   ← the whole slice: composes <SignupForm/> etc. from features
   ```

## Commit Convention

Format: `type: 짧은 한글 설명` — a single short subject line in Korean, nothing else (no body, no trailers). Split changes into logical units.

- Types: `feat` `fix` `refactor` `style` `test` `docs` `ci` `chore`
- Examples: `feat: 로그인 폼 추가`, `fix: CI 액션 버전 최신화`

**Never push unless the user explicitly asks.** Committing autonomously is fine.

## PR Convention

- Base branch: `develop` (fall back to `main` if absent)
- **The PR template is mandatory**: always read `.github/PULL_REQUEST_TEMPLATE.md` and follow its structure exactly, written in Korean. Fill every applicable section; delete sections that don't apply.
- CI must pass: lint/format → typecheck → unit tests → build → e2e.

## Testing

- Unit tests are colocated next to their target file as `*.test.tsx` (e.g. `page.test.tsx`)
- Testing Library + jsdom environment; E2E tests live in `e2e/` (Playwright)

## Rules

Detailed conventions live in `.claude/rules/` and load automatically per file pattern:

- `typescript.md` — strict typing rules (no `any`, no `as`, no `enum`, ...)
- `react.md` — Server Components first, component structure, Next.js primitives
- `styling.md` — Tailwind 4 token usage, no hardcoded values
- `testing.md` — Vitest/Testing Library and Playwright conventions
- `fsd.md` — slice structure, naming, layer placement heuristics
