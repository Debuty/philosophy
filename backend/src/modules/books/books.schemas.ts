import { z } from "zod";

const optionalSearch = z.preprocess(
  (value) => {
    if (typeof value !== "string") return value;
    const trimmed = value.trim();
    return trimmed === "" ? undefined : trimmed;
  },
  z.string().min(1).optional(),
);

export const listBooksQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().max(100).default(12),
  bookName: optionalSearch,
  author: optionalSearch,
});

export const bookIdParamSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export type ListBooksQuery = z.infer<typeof listBooksQuerySchema>;
