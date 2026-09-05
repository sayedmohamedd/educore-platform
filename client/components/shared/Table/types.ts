import { ReactNode } from "react";

export type TableFilterOption<TValue extends string = string> = {
  value: TValue;
  label: string;
};

export type TableFilter<TValue extends string = string> = {
  key: string;
  label: string;
  options: TableFilterOption<TValue>[];
};

export type TableSearch = {
  placeholder?: string;
};

export type Column<T> = {
  key: string;
  label: string;
  align?: "left" | "center" | "right";
  render: (item: T) => ReactNode;
};

export type FilterValues = Record<string, string>;

export type TableProps<T> = {
  data: T[];
  columns: Column<T>[];

  filters?: TableFilter[];

  search?: TableSearch;

  filterData?: (item: T, values: FilterValues & { search: string }) => boolean;

  emptyMessage?: string;

  getRowKey?: (item: T, index: number) => string | number;

  isLoading?: boolean;
};
