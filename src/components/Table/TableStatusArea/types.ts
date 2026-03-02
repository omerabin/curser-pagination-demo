/** Visual variant of the status area, controls icon and ARIA role. */
export type TableStatusVariant = 'empty' | 'error';

export interface TableStatusAreaProps {
  /** Controls which icon and ARIA role is rendered. */
  variant: TableStatusVariant;
  /** The human-readable message displayed beneath the icon. */
  message: string;
}
