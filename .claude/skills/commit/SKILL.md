---
name: commit
description: Commit working-tree changes in logical units following the project convention (short single-line "type: 한글 설명"). Use when asked to commit or when work is done and needs committing.
---

# Commit Skill

Commit the current working-tree changes following the project convention.

## Steps

1. Run `git status` and `git diff` to understand all changes.
2. Group changes into **logical units**. If unrelated concerns are mixed (e.g. a feature plus config changes), split them into separate commits.
3. For each unit, `git add` only the relevant files, then commit.

## Commit Message Format

```
type: 짧은 한글 설명
```

- A single short subject line only, **written in Korean** — no body, no trailers (no Co-Authored-By).
- End with a noun form (e.g. "~추가", "~수정", "~구성").
- Types:
  - `feat` — new feature
  - `fix` — bug fix
  - `refactor` — restructuring without behavior change
  - `style` — formatting, styling
  - `test` — add/update tests
  - `docs` — documentation
  - `ci` — CI/CD configuration
  - `chore` — build, tooling, misc configuration

Examples:

- `feat: 로그인 폼 추가`
- `fix: CI 액션 버전 최신화`
- `test: Vitest 및 Playwright 테스트 환경 구성`

## Cautions

- If the pre-commit hook (lint-staged) fails, fix the cause and commit again. Never bypass with `--no-verify`.
- Before committing code changes, verify there are no type errors with `npx tsc --noEmit`.
- **Never push.** Only push when the user explicitly asks.
- If about to commit feature work on the `main` branch, ask the user first whether to create a branch.
