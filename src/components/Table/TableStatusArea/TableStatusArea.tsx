import React from 'react';
import styles from '../styles.module.scss';
import type { TableStatusAreaProps } from './types';

/**
 * Displays an empty-state or error-state message beneath the table body.
 * React.memo: pure presentational — re-renders only when message or variant changes.
 */
export const TableStatusArea: React.FC<TableStatusAreaProps> = React.memo(({ variant, message }) => {
  const isError = variant === 'error';

  return (
    <div className={styles.statusArea} role={isError ? 'alert' : 'status'}>
      <span className={isError ? styles.errorIcon : styles.emptyIcon} aria-hidden='true'>
        {isError ? '⚠' : '◎'}
      </span>
      <p className={styles.statusText}>{message}</p>
    </div>
  );
});

TableStatusArea.displayName = 'TableStatusArea';
