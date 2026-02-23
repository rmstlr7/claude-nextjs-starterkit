import { z } from 'zod';

// 검색 쿼리 스키마
export const searchQuerySchema = z.object({
  query: z.string().optional(),
  page: z.number().int().positive().optional().default(1),
  limit: z.number().int().positive().optional().default(10),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional().default('desc'),
});

export type SearchQuery = z.infer<typeof searchQuerySchema>;

// 페이지네이션 스키마
export const paginationSchema = z.object({
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(10),
  total: z.number().int().nonnegative(),
});

export type Pagination = z.infer<typeof paginationSchema>;

// 목록 응답 스키마
export const listResponseSchema = <T extends z.ZodType>(dataSchema: T) =>
  z.object({
    data: z.array(dataSchema),
    pagination: paginationSchema,
  });

export type ListResponse<T> = {
  data: T[];
  pagination: Pagination;
};
