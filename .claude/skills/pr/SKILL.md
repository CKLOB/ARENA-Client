---
name: pr
description: Create a GitHub PR from the current branch. Strictly follows .github/PULL_REQUEST_TEMPLATE.md for the body (written in Korean) and submits via gh CLI. Use when asked to create a PR.
---

# PR Creation Skill

Create a Pull Request from the commits on the current branch.
**The PR template is the top priority** — the body must follow `.github/PULL_REQUEST_TEMPLATE.md` exactly.

## Steps

1. Check the current branch. If on `main`/`develop`, a PR cannot be created — tell the user and offer to create a branch.
2. Determine the base branch: `develop` if it exists on the remote, otherwise `main`.
3. Understand the **full branch diff** (not just the latest commit) via `git log <base>..HEAD --oneline` and `git diff <base>...HEAD --stat`.
4. **Read `.github/PULL_REQUEST_TEMPLATE.md` first** — always base the body on the current template file, never on a memorized copy (the template may have changed). If the file doesn't exist, use the section structure below.
5. If a push is needed, **ask the user first**. Never push without consent.
6. Create the PR with `gh pr create`. Title follows the commit convention: `type: 짧은 한글 설명`.

## PR Body Rules

Write the body in **Korean**, keeping the template's structure, headings, and emoji exactly as-is:

- `## 💡 PR 요약` — bullet summary of the changes and related issue. Link the issue (`#번호`) if one exists.
- `## 📋 작업 내용` — detailed description of what was done. For UI changes, ask the user to attach screenshots.
- `## 🤝 리뷰 시 참고사항` — things reviewers should know: design decisions, open questions, areas needing careful review.

Additional rules:

- Do not add, rename, or reorder sections. Do not leave the template's placeholder/guide text (`> ...`, `{변경사항}`) in the final body.
- Delete sections that have nothing to write, per the template's own instruction ("작성하지 않은 부분은 삭제해주세요").
- Append at the end of the body: `🤖 Generated with [Claude Code](https://claude.com/claude-code)`

## Cautions

- Before creating the PR, verify locally: `npm run lint`, `npm run format:check`, `npx tsc --noEmit`, `npm run test`, `npm run build`.
- Share the PR URL with the user after creation.
