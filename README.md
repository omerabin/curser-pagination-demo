Here’s a polished README for your repo based on your instructions. I’ve made sure to highlight CLAUDE usage and the cursor pagination requirement:

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

## Component Structure

- Named exports only — no default exports
- React.memo and React.forwardRef used only with clear justification
- Props extended from native HTML elements
- Fully accessible with correct ARIA roles
- Component and all types exported via `index.ts` barrel

---

## Cursor Pagination

- Cursor pagination ensures the component fetches **data in batches**
- Only the rows currently visible in the viewport are rendered in the DOM
- Scrolling triggers fetching of the next batch of data
- Efficient memory usage and minimal re-rendering

---

## Getting Started

1. **Install dependencies**

```bash
npm install
```

2. **Run development server**

```bash
npm run dev
```

3. **Usage Example**

```tsx
/** Usage: <Table columns={columns} fetchRows={fetchRows} /> */
```

---

## Component To Build

This Table component was **described to GPT** using a detailed prompt requesting a **JIRA-style development-ready task description**. The technical requirements included:

- Support for **cursor pagination**
- **Only visible elements are present in the DOM**
- Fully typed and accessible

> The resulting implementation adheres to the prompt, ensuring production-ready, reusable code for modern React applications.

---

## File Structure

```
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

## Contributing

- Follow **TypeScript strict typing rules**
- No inline styles or hardcoded values
- Ensure **only visible rows** are rendered in the DOM
- All hooks, effects, and memoization must include **inline justification comments**

---

This README emphasizes CLAUDE as the source of the implementation and clearly communicates that **cursor pagination** and **DOM performance optimizations** were technical requirements.

---
