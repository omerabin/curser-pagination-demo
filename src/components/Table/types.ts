/**
 * Represents a single row of data displayed in the Table.
 */
export interface TableRow {
  /** Unique identifier for the row, used as React key and for cursor pagination. */
  id: string;
  /** The title of the item. */
  title: string;
  /** ISO 8601 timestamp string of when the item was created. */
  createdAt: string;
  /** Brief content or description of the item. */
  content: string;
}

/**
 * Cursor-based pagination state returned alongside data from the API.
 */
export interface PaginationInfo {
  /** Opaque cursor pointing to the next page. `null` when no more pages exist. */
  nextCursor: string | null;
  /** Whether another page of results is available. */
  hasNextPage: boolean;
}

/** Possible loading states for the table. */
export type TableLoadingState = 'idle' | 'loading' | 'loadingMore' | 'error';

/**
 * The slice of all loaded rows that should currently be rendered in the DOM,
 * plus the pixel heights of the virtual spacers above and below.
 */
export interface VirtualWindow {
  /** Index (inclusive) of the first row to render. */
  startIndex: number;
  /** Index (exclusive) of the last row to render. */
  endIndex: number;
  /** Height in px of the top spacer <tr> replacing unmounted rows above. */
  topSpacerHeight: number;
  /** Height in px of the bottom spacer <tr> replacing unmounted rows below. */
  bottomSpacerHeight: number;
}

/**
 * Async function called by the Table when it needs the next batch of data.
 * @param cursor - Opaque cursor from the previous response, or `null` for the first page.
 */
export type FetchRowsFn = (cursor: string | null) => Promise<{
  rows: TableRow[];
  pagination: PaginationInfo;
}>;

/**
 * Props for the Table component.
 * Extends `<div>` so consumers can forward aria-* / data-* / className etc.
 */
export interface TableProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Async function invoked to load the initial and subsequent pages.
   * The component manages cursor state internally.
   */
  onFetchRows: FetchRowsFn;

  /**
   * Number of rows fetched per page.
   * @default 20
   */
  pageSize?: number;

  /**
   * Fixed height of every data row in pixels. Must match the CSS row height
   * defined in styles.module.scss ($row-height). Virtual windowing depends on
   * this value to compute spacer heights without measuring the DOM.
   * @default 52
   */
  rowHeight?: number;

  /**
   * Number of extra rows rendered above and below the visible viewport.
   * Larger values reduce blank-row flicker during fast scrolling at the cost
   * of more DOM nodes.
   * @default 5
   */
  overscan?: number;

  /**
   * Message shown in the empty state when no rows are returned.
   * @default "No items found."
   */
  emptyMessage?: string;

  /**
   * Message shown when the fetch throws an error.
   * @default "Something went wrong. Please try again."
   */
  errorMessage?: string;

  /**
   * Pixel threshold from the bottom of the scroll container at which the
   * next page fetch is triggered.
   * @default 120
   */
  scrollThreshold?: number;

  /**
   * Optional additional className merged last onto the root element.
   */
  className?: string;
}
export interface TableSpacerRowProps {
  /** Height in pixels this spacer row should occupy, replacing unmounted rows. */
  height: number;
}
