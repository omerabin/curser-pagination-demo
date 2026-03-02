/**
 * Demo: Table component with mock cursor-based pagination.
 * Replace `mockFetch` with your real API call.
 */
import { useCallback } from 'react';
import { Table } from './components/Table';
import type { FetchRowsFn } from './components/Table';

// ── Mock data generator ───────────────────────────────────────────────────

const TOTAL_ITEMS = 120;

const generateItem = (index: number) => {
  return {
    id: `item-${index}`,
    title: `Item #${String(index).padStart(4, '0')} — Sample Title`,
    createdAt: new Date(Date.now() - index * 1_800_000).toISOString(),
    content: `This is a brief description for item ${index}. It contains relevant details about the subject matter.`,
  };
};

const allItems = Array.from({ length: TOTAL_ITEMS }, (_, i) => generateItem(i + 1));

const cursorToIndex = (cursor: string | null): number => {
  if (!cursor) return 0;
  return parseInt(cursor, 10);
};

// ── App ───────────────────────────────────────────────────────────────────

export const App = () => {
  // useCallback: stable reference required — Table's useEffect depends on this fn
  const fetchRows: FetchRowsFn = useCallback(async (cursor) => {
    // Simulate network latency
    await new Promise((r) => setTimeout(r, 800));

    const startIndex = cursorToIndex(cursor);
    const PAGE_SIZE = 20;
    const slice = allItems.slice(startIndex, startIndex + PAGE_SIZE);
    const nextIndex = startIndex + PAGE_SIZE;
    const hasNextPage = nextIndex < TOTAL_ITEMS;

    return {
      rows: slice,
      pagination: {
        nextCursor: hasNextPage ? String(nextIndex) : null,
        hasNextPage,
      },
    };
  }, []);

  return (
    <div style={{ padding: '40px', maxWidth: '960px', margin: '0 auto' }}>
      <h1 style={{ fontFamily: 'var(--font-display)', marginBottom: '24px' }}>Table — Cursor Pagination Demo</h1>
      <Table
        onFetchRows={fetchRows}
        scrollThreshold={120}
        emptyMessage='No items found.'
        errorMessage='Failed to load data. Please try again.'
        style={{ maxHeight: '520px' } as React.CSSProperties}
      />
    </div>
  );
};
