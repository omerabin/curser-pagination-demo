---
# React Cursor Pagination Table Component

This repository contains a **reusable Table component** built with **React + TypeScript** that supports **cursor pagination**. The component ensures that **only elements currently visible to the user are rendered in the DOM** for maximum performance.

> ⚠️ **Note:** The implementation and design decisions in this component were generated using **CLAUDE only**.
---

## Features

- Built with **React 18** and **TypeScript 5** (strict mode enabled)
- Cursor-based pagination to efficiently handle large datasets
- Only renders visible rows to minimize DOM size and improve performance
- Fully typed with exported interfaces in `types.ts`
- SCSS modules for styling with BEM conventions
- Supports controlled and uncontrolled usage patterns
- Clean separation of concerns: hooks, components, types, and styles

---

## Tech Stack

- **React 18**
- **TypeScript 5** (strict mode)
- **SCSS Modules** (.module.scss)
- **Vite** (browser-only, no SSR)
- `clsx` allowed for className merging
- No external UI or icon libraries

---

## CLAUDE Prompt Used

The Table component was implemented based on the following **CLAUDE-generated prompt**:

```
You are an expert React + TypeScript UI engineer. Build a reusable [COMPONENT NAME] component following ALL rules below without exception.

════════════════════════════════════════
TYPESCRIPT
════════════════════════════════════════

* Every prop defined in a named, exported interface in types.ts
* JSDoc comment on every single prop
* No `any`, no `unknown`, no non-null assertions (!)
* Extend native HTML element attributes for the root element
  e.g. `interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>`
* Discriminated unions for variants, sizes, and states
  e.g. `type ButtonVariant = "primary" | "ghost" | "danger"`
* Generic components where applicable, e.g., `List<T>`, `Select<T>`
* All types and interfaces exported via `index.ts` barrel, which re-exports the component and all types
* Use only Arrow Functions syntax
════════════════════════════════════════
COMPONENT STRUCTURE
════════════════════════════════════════

* Named exports only — no default exports
* Use React.memo only when the component is pure presentational with stable props and re-rendering would be wasteful
* Use React.forwardRef only when the consumer genuinely needs access to the underlying DOM node
* Set `displayName` on every component using memo or forwardRef
* Support both controlled (`value + onChange`) and uncontrolled (`defaultValue`) usage; handle controlled/uncontrolled conflicts carefully
* Always accept `className` and append last when merging:
  `const rootClassName = clsx(styles.root, styles[\`root--${variant}`], className)`
* Spread remaining native HTML attributes onto the root element
* Compound component pattern for complex components, e.g., `<Select>` + `<Select.Option>`
* Include a usage example in a comment block at the top of ComponentName.tsx:
  `/** Usage: <ComponentName ... /> */`

════════════════════════════════════════
PERFORMANCE
════════════════════════════════════════

* Apply memoization only when clearly justified
* `useCallback`: wrap functions passed to memoized children or used in useMemo/useEffect dependencies
* `useMemo`: wrap expensive computations or reference-type results passed to memoized children
* `React.memo`: apply only to pure presentational components with measurable re-render cost
* Every use of `useCallback`, `useMemo`, or `React.memo` must include a brief inline comment explaining why it is needed

════════════════════════════════════════
useEffect — MINIMIZATION RULES
════════════════════════════════════════
PERMITTED only for:
✅ Syncing with an external non-React system (e.g., ResizeObserver, third-party DOM lib)
✅ Subscriptions that require cleanup

FORBIDDEN for:
❌ Deriving state from props → use useMemo instead
❌ Syncing one state to another → derive during render
❌ Resetting state on prop change → use `key` or derive inline
❌ Running logic "after render" → use refs or event callbacks
❌ Data fetching triggered by state/prop change → handle in event handlers

Every permitted useEffect must include a comment explaining why it cannot be replaced with useMemo, useRef, or an event handler, and must return a cleanup function if setting up listeners/subscriptions

════════════════════════════════════════
ICONS
════════════════════════════════════════

* No icon libraries (lucide, heroicons, react-icons, etc.)
* Consumer can pass any ReactNode as icons via `startIcon`, `endIcon`, or `icon` props (including imported SVG React components)
* All SVG files live in `src/assets/icons/` and are imported with Vite’s `?react` suffix:
  `import ChevronIcon from '@/assets/icons/chevron.svg?react'`
* SVGs must:
  • Use `currentColor` for fill/stroke
  • Have `focusable="false"`
  • Have `aria-hidden="true"` when decorative
  • Accept `width` and `height` as props

════════════════════════════════════════
SCSS MODULES
════════════════════════════════════════

* Every component with styles must have its own `styles.module.scss` file
* Import pattern: `import styles from './styles.module.scss'`
* Use `@use` (never `@import`)
* Design tokens as CSS custom properties at `:root` in `_tokens.scss`
* SCSS variables for compile-time values ($radius-md, $font-size-lg)
* BEM-style modifier classes, e.g., `.button--primary`
* No hardcoded colors, !important, inline styles, or global styles
* No selector nesting deeper than 3 levels (including pseudo-classes)
* No styling HTML elements directly
* All interactive states must be explicitly styled: `:hover`, `:focus-visible`, `:active`, `:disabled`, `[aria-disabled="true"]`
* Dark mode via `[data-theme="dark"]` on `:root`

════════════════════════════════════════
ACCESSIBILITY
════════════════════════════════════════
Components must expose correct semantic meaning and behavior to assistive technologies

════════════════════════════════════════
API CONVENTIONS
════════════════════════════════════════

* Callbacks prefixed with `on`: `onClose`, `onChange`, `onSelect`
* Boolean props prefixed with `is`: `isDisabled`, `isLoading`, `isOpen`, `isRequired`
* Minimize required props — reasonable defaults for all
* No side effects during render — components must remain pure and predictable

════════════════════════════════════════
STRICTLY FORBIDDEN
════════════════════════════════════════
❌ any, unknown, or non-null assertions (!)
❌ Default exports
❌ Icon or UI libraries
❌ Hardcoded colors, sizes, z-index values, magic numbers (use tokens/variables)
❌ Inline styles except for dynamically computed values
❌ Global CSS or styles leaking outside module
❌ useEffect for state sync, derived values, or prop-change reactions
❌ Direct DOM manipulation
❌ Business logic inside UI components
❌ Sub Components implementation inside the large Component file
❌ @import in SCSS
❌ Hardcoded SVG paths or icon library components
❌ Using memo, forwardRef, useCallback, or useMemo without justification and inline comment

════════════════════════════════════════
FILE STRUCTURE
════════════════════════════════════════
src/
├── assets/
│   └── icons/               ← all SVG files
│       ├── chevron.svg
│       ├── close.svg
│       └── ...
└── components/
└── ComponentName/
├── index.ts          ← barrel: re-exports component + all types
├── ComponentName.tsx ← component (usage example comment at top)
├── types.ts          ← all interfaces, types, enums with JSDoc on every prop
├── styles.module.scss← scoped styles only
└── useComponentName.ts ← extracted hooks (only if component has state, effects, or logic; omit empty files)

════════════════════════════════════════
COMPONENT TO BUILD
════════════════════════════════════════
[DESCRIBE YOUR COMPONENT HERE] — replace literally in files (TSX, SCSS, types)
```

> The CLAUDE prompt instructed GPT to **write a JIRA-style task description** for this component, specifying **cursor pagination** and **DOM performance optimization** (only visible rows rendered).

---

## File Structure

```bash
src/
├── assets/
│   └── icons/
├── components/
│   └── Table/
│       ├── index.ts
│       ├── Table.tsx
│       ├── types.ts
│       ├── styles.module.scss
│       └── useTable.ts
```

---

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Run development server:

```bash
npm run dev
```

3. Usage example:

```tsx
/** Usage: <Table columns={columns} fetchRows={fetchRows} /> */
```

---

This README now **fully includes the CLAUDE prompt** exactly as requested and explains that the component supports **cursor pagination** and **renders only visible DOM elements**.

---
