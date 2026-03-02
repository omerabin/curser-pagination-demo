import React from 'react';
import type { TableSpacerRowProps } from './types';

/**
 * An invisible <tr> that holds the vertical space of unmounted virtual rows,
 * keeping the scrollbar thumb size and position accurate.
 *
 * React.memo: height only changes when the virtual window boundary shifts,
 * which is infrequent relative to scroll events — memoization prevents
 * redundant DOM patching on every scroll tick.
 */
export const TableSpacerRow: React.FC<TableSpacerRowProps> = React.memo(({ height }) => {
  if (height <= 0) return null;

  return (
    <tr
      aria-hidden='true'
      // Inline style justified: height is a dynamically computed pixel value
      // that cannot be expressed as a static CSS class.
      style={{ height }}
    >
      <td colSpan={3} />
    </tr>
  );
});

TableSpacerRow.displayName = 'TableSpacerRow';
