import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../api/queryKeys";
import { getBook } from "../api/booksApi";

export function useBookDetails(bookId: number | null) {
  return useQuery({
    queryKey: queryKeys.books.detail(bookId ?? 0),
    queryFn: () => getBook(bookId!),
    enabled: bookId != null && bookId > 0,
  });
}
