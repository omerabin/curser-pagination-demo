import { useMemo } from 'react';
import type { VirtualWindow } from './types';

interface UseVirtualRowsOptions {
  totalRows: number;
  scrollTop: number;
  containerHeight: number;
  rowHeight: number;
  overscan: number;
}

/**
 * Pure computation hook — derives the visible row window from scroll position.
 * No effects or refs needed: all inputs are reactive state values.
 *
 * Strategy:
 *  - Divide scrollTop by rowHeight to find the first potentially visible row.
 *  - Divide (scrollTop + containerHeight) by rowHeight to find the last.
 *  - Expand both ends by `overscan` rows to soften scroll-edge flicker.
 *  - Clamp to [0, totalRows] so indices are always valid.
 *  - Compute spacer heights as the pixel area occupied by unmounted rows.
 */
export const useVirtualRows = ({
  totalRows,
  scrollTop,
  containerHeight,
  rowHeight,
  overscan,
}: UseVirtualRowsOptions): VirtualWindow =>
  // useMemo: expensive index arithmetic that directly drives DOM structure;
  // avoids recomputing on every render when only unrelated state changes.
  useMemo<VirtualWindow>(() => {
    if (totalRows === 0 || containerHeight === 0) {
      return { startIndex: 0, endIndex: 0, topSpacerHeight: 0, bottomSpacerHeight: 0 };
    }

    const rawStart = Math.floor(scrollTop / rowHeight);
    const rawEnd = Math.ceil((scrollTop + containerHeight) / rowHeight);

    const startIndex = Math.max(0, rawStart - overscan);
    const endIndex = Math.min(totalRows, rawEnd + overscan);

    const topSpacerHeight = startIndex * rowHeight;
    const bottomSpacerHeight = (totalRows - endIndex) * rowHeight;

    return { startIndex, endIndex, topSpacerHeight, bottomSpacerHeight };
  }, [totalRows, scrollTop, containerHeight, rowHeight, overscan]);
