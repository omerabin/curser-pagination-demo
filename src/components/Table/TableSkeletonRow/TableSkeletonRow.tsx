import React from 'react';
import styles from '../styles.module.scss';
import type { TableSkeletonRowProps } from './types';

/**
 * A single shimmer placeholder row rendered during the initial loading state.
 * React.memo: pure presentational — props never change between renders while
 * the skeleton is visible, so memoization avoids redundant reconciliation.
 */
export const TableSkeletonRow: React.FC<TableSkeletonRowProps> = React.memo(({ index }) => (
  <tr
    className={styles.skeletonRow}
    aria-hidden='true'
    // Inline style justified: value is dynamically computed from `index` prop
    style={{ animationDelay: `${index * 60}ms` }}
  >
    <td>
      <span className={styles.skeletonCell} style={{ width: '55%' }} />
    </td>
    <td>
      <span className={styles.skeletonCell} style={{ width: '70%' }} />
    </td>
    <td>
      <span className={styles.skeletonCell} style={{ width: '85%' }} />
    </td>
  </tr>
));

TableSkeletonRow.displayName = 'TableSkeletonRow';
