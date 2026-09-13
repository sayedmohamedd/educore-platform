export type PaginationParams = {
  page?: number;
  limit?: number;
};

export type PaginationMeta = {
  page: number;
  limit: number;
  total: number;
  lastPage: number;
};

export type PaginatedResult<T> = {
  data: T[];
  meta: PaginationMeta;
};
