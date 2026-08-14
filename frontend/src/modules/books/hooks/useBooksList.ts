import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../api/queryKeys";
import { listBooks } from "../api/booksApi";
import type { ListBooksParams } from "../types";

export function useBooksList(filters: ListBooksParams = {}) {
  return useQuery({
    queryKey: queryKeys.books.list(filters),
    queryFn: () => listBooks(filters),
  });
}
