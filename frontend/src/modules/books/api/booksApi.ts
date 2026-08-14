import { apiClient } from "../../../api/client";
import type { ApiSuccess } from "../../../api/types";
import type {
  BookDetail,
  BookListItem,
  BooksListResult,
  BooksPagination,
  ListBooksParams,
} from "../types";

type ListResponse = {
  data: BookListItem[];
  pagination?: BooksPagination;
};

export async function listBooks(
  params: ListBooksParams = {},
): Promise<BooksListResult> {
  const page = params.page ?? 1;
  const pageSize = params.pageSize ?? 3;

  const { data } = await apiClient.get<ListResponse>("/books", {
    params: {
      page,
      pageSize,
      ...(params.bookName?.trim() ? { bookName: params.bookName.trim() } : {}),
      ...(params.author?.trim() ? { author: params.author.trim() } : {}),
    },
  });

  return {
    data: data.data,
    pagination: data.pagination ?? {
      page,
      pageSize,
      total: data.data.length,
      totalPages: Math.ceil(data.data.length / pageSize) || 0,
    },
  };
}

export async function getBook(id: number): Promise<BookDetail> {
  const { data } = await apiClient.get<ApiSuccess<BookDetail>>(`/books/${id}`);
  return data.data;
}
