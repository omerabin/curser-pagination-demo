import React from 'react';
import styles from '../styles.module.scss';
import type { TableDataRowProps } from './types';

/**
 * Renders a single data row with formatted date, title, and content cells.
 * React.memo: pure presentational — row data is stable after appended to the
 * list; memoization prevents all prior rows from re-rendering when new rows
 * are loaded at the bottom.
 */
export const TableDataRow: React.FC<TableDataRowProps> = React.memo(({ row }) => {
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(row.createdAt));

  return (
    <tr className={styles.dataRow}>
      <td className={styles.cellTitle} title={row.title}>
        {row.title}
      </td>
      <td className={styles.cellDate}>
        <time dateTime={row.createdAt}>{formattedDate}</time>
      </td>
      <td className={styles.cellContent} title={row.content}>
        {row.content}
      </td>
    </tr>
  );
});

TableDataRow.displayName = 'TableDataRow';
