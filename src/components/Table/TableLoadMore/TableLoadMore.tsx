import React from 'react';
import styles from '../styles.module.scss';
import type { TableLoadMoreProps } from './types';

/**
 * Spinner indicator shown at the bottom of the table while the next page loads.
 * React.memo: pure presentational with a stable `label` prop — no need to
 * re-render while the spinner is already mounted and animating.
 */
export const TableLoadMore: React.FC<TableLoadMoreProps> = React.memo(({ label = 'Loading more rows' }) => (
  <div className={styles.loadMoreArea} role='status' aria-label={label}>
    <span className={styles.spinner} aria-hidden='true' />
    <span className={styles.loadMoreText}>Loading more…</span>
  </div>
));

TableLoadMore.displayName = 'TableLoadMore';
