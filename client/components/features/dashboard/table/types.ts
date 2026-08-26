export interface Column<T> {
  header: string;
  accessorKey?: keyof T; // مفتاح البيانات في الأوبجكت
  cell?: (item: T) => React.ReactNode; // لو الـ Cell محتاج تصميم خاص (زي زرار، لتر، سبان ملون)
  className?: string;
}

export interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  meta?: {
    page: number;
    lastPage: number;
    total: number;
  };
  isLoading?: boolean;
}
