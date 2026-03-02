import { useCallback, useEffect, useRef, useState } from 'react';
import type { FetchRowsFn, PaginationInfo, TableLoadingState, TableRow } from './types';

interface UseTableOptions {
  onFetchRows: FetchRowsFn;
  scrollThreshold: number;
}

interface UseTableReturn {
  rows: TableRow[];
  loadingState: TableLoadingState;
  scrollTop: number;
  containerHeight: number;
  scrollRef: React.RefObject<HTMLDivElement | null>;
}

export const useTable = ({ onFetchRows, scrollThreshold }: UseTableOptions): UseTableReturn => {
  const [rows, setRows] = useState<TableRow[]>([]);
  const [loadingState, setLoadingState] = useState<TableLoadingState>('loading');
  const [scrollTop, setScrollTop] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);

  // pagination ref kept alongside state so cursor is always fresh inside callbacks
  const [, setPagination] = useState<PaginationInfo>({ nextCursor: null, hasNextPage: true });

  const scrollRef = useRef<HTMLDivElement | null>(null);
  // Refs hold mutable state that must NOT trigger re-renders
  const isFetchingRef = useRef(false);
  const cursorRef = useRef<string | null>(null);
  const hasNextPageRef = useRef(true);

  // useCallback: used as a dependency in both useEffects below; must be stable
  const fetchRows = useCallback(async (isInitial: boolean): Promise<void> => {
    if (isFetchingRef.current || (!isInitial && !hasNextPageRef.current)) return;

    isFetchingRef.current = true;
    setLoadingState(isInitial ? 'loading' : 'loadingMore');

    try {
      const { rows: newRows, pagination: newPagination } = await onFetchRows(isInitial ? null : cursorRef.current);

      cursorRef.current = newPagination.nextCursor;
      hasNextPageRef.current = newPagination.hasNextPage;
      setPagination(newPagination);

      setRows((prev) => (isInitial ? newRows : [...prev, ...newRows]));
      setLoadingState('idle');
    } catch {
      setLoadingState('error');
    } finally {
      isFetchingRef.current = false;
    }
    // onFetchRows intentionally omitted — consumers must stabilise it with useCallback
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Permitted useEffect: triggers the initial data load from an external async source.
  // Cannot use useMemo (side-effectful) or an event handler (no user event drives this).
  useEffect(() => {
    fetchRows(true);
  }, [fetchRows]);

  // Permitted useEffect: attaches passive scroll + ResizeObserver to a DOM node.
  // Cannot use useMemo or refs — requires addEventListener / observer lifecycle with cleanup.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    // Seed container height immediately so first render is correct
    setContainerHeight(el.clientHeight);

    const handleScroll = (): void => {
      setScrollTop(el.scrollTop);

      const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
      if (distanceFromBottom <= scrollThreshold && hasNextPageRef.current && !isFetchingRef.current) {
        fetchRows(false);
      }
    };

    // ResizeObserver keeps containerHeight accurate when the host element resizes
    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry !== undefined) {
        setContainerHeight(entry.contentRect.height);
      }
    });

    el.addEventListener('scroll', handleScroll, { passive: true });
    resizeObserver.observe(el);

    return () => {
      el.removeEventListener('scroll', handleScroll);
      resizeObserver.disconnect();
    };
  }, [fetchRows, scrollThreshold]);

  return { rows, loadingState, scrollTop, containerHeight, scrollRef };
};
