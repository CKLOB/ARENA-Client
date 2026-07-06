---
paths:
  - 'src/**/*.{tsx,css}'
---

# Styling Rules (Tailwind CSS 4)

- Tailwind utility classes only — no inline `style` attributes, no CSS Modules, no styled-components.
- Design tokens (colors, spacing, fonts) are defined via `@theme` in `src/app/globals.css` — never hardcode hex colors or magic pixel values in class names (`bg-[#ff0000]`, `w-[13px]`). Add a token instead.
- Reusable visual patterns become `shared/ui` components, not copy-pasted class strings.
- Mobile-first: write base styles for small screens, layer `sm:`/`md:`/`lg:` upward.
- Support dark mode via Tailwind's `dark:` variant when styling new UI.
- Class order follows Prettier/ESLint output — don't hand-sort or fight the formatter.
- Prefer `gap` (flex/grid) over margins between siblings.
