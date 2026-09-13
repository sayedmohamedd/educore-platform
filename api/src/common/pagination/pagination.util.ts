import { PaginationMeta } from './pagination.types.js';

export const getPagination = (
  page = 1,
  limit = 10,
): { skip: number; take: number } => {
  return {
    skip: (page - 1) * limit,
    take: limit,
  };
};

export const getPaginationMeta = (
  page: number,
  limit: number,
  total: number,
): PaginationMeta => {
  return {
    page,
    limit,
    total,
    lastPage: Math.ceil(total / limit),
  };
};
