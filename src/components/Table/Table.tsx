/**
 * Usage:
 *
 * ```tsx
 * import { Table } from "@/components/Table";
 * import type { FetchRowsFn } from "@/components/Table";
 *
 * const fetchRows: FetchRowsFn = async (cursor) => {
 *   const res = await api.getItems({ cursor, limit: 20 });
 *   return {
 *     rows: res.items,
 *     pagination: { nextCursor: res.nextCursor, hasNextPage: res.hasNext },
 *   };
 * };
 *
 * // rowHeight must match $row-height in styles.module.scss (default 52px)
 * <Table onFetchRows={fetchRows} rowHeight={52} overscan={5} />
 * ```
 */

import clsx from 'clsx';
import React, { useCallback } from 'react';
import styles from './styles.module.scss';
import { TableDataRow } from './TableDataRow';
import { TableLoadMore } from './TableLoadMore';
import { TableSkeletonRow } from './TableSkeletonRow';
import { TableSpacerRow } from './TableSpacerRow';
import { TableStatusArea } from './TableStatusArea';
import type { TableProps } from './types';
import { useTable } from './useTable';
import { useVirtualRows } from './useVirtualRows';

const SKELETON_ROW_COUNT = 8;

export const Table = React.forwardRef<HTMLDivElement, TableProps>(
  (
    {
      onFetchRows,
      pageSize: _pageSize = 20,
      rowHeight = 52,
      overscan = 5,
      emptyMessage = 'No items found.',
      errorMessage = 'Something went wrong. Please try again.',
      scrollThreshold = 120,
      className,
      ...rest
    },
    ref,
  ) => {
    const { rows, loadingState, scrollTop, containerHeight, scrollRef } = useTable({
      onFetchRows,
      scrollThreshold,
    });

    const { startIndex, endIndex, topSpacerHeight, bottomSpacerHeight } = useVirtualRows({
      totalRows: rows.length,
      scrollTop,
      containerHeight,
      rowHeight,
      overscan,
    });

    // useCallback: merges the internal scrollRef with the consumer's forwarded ref;
    // must be stable so React does not re-run the ref callback on every render.
    const setScrollRef = useCallback(
      (el: HTMLDivElement | null) => {
        (scrollRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
        if (typeof ref === 'function') {
          ref(el);
        } else if (ref !== null && ref !== undefined) {
          ref.current = el;
        }
      },
      [ref, scrollRef],
    );

    const isInitialLoading = loadingState === 'loading';
    const isLoadingMore = loadingState === 'loadingMore';
    const isError = loadingState === 'error';
    const isEmpty = loadingState === 'idle' && rows.length === 0;

    // useMemo: slicing the rows array on every scroll tick without memoization
    // would create a new array reference and force TableDataRow children to diff.
    const visibleRows = React.useMemo(() => rows.slice(startIndex, endIndex), [rows, startIndex, endIndex]);

    return (
      <div
        ref={setScrollRef}
        className={clsx(styles.root, className)}
        role='region'
        aria-label='Data table'
        aria-busy={isInitialLoading || isLoadingMore}
        {...rest}
      >
        <table className={styles.table} aria-colcount={3} aria-rowcount={rows.length}>
          <thead className={styles.thead}>
            <tr>
              <th scope='col' className={styles.th}>
                Title
              </th>
              <th scope='col' className={styles.th}>
                Creation Time
              </th>
              <th scope='col' className={styles.th}>
                Content
              </th>
            </tr>
          </thead>

          <tbody className={styles.tbody}>
            {isInitialLoading ? (
              Array.from({ length: SKELETON_ROW_COUNT }, (_, i) => <TableSkeletonRow key={i} index={i} />)
            ) : (
              <>
                <TableSpacerRow height={topSpacerHeight} />
                {visibleRows.map((row) => (
                  <TableDataRow key={row.id} row={row} />
                ))}
                <TableSpacerRow height={bottomSpacerHeight} />
              </>
            )}
          </tbody>
        </table>

        {isEmpty && <TableStatusArea variant='empty' message={emptyMessage} />}
        {isError && <TableStatusArea variant='error' message={errorMessage} />}
        {isLoadingMore && <TableLoadMore />}
      </div>
    );
  },
);

Table.displayName = 'Table';
