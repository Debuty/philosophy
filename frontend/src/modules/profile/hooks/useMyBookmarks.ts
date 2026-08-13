import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../api/queryKeys";
import { listMyBookmarks } from "../../articles/api/articlesApi";
import type { ListBookmarksParams } from "../../articles/types";

export function useMyBookmarks(
  enabled: boolean,
  filters: ListBookmarksParams = {},
) {
  const params = {
    page: filters.page ?? 1,
    pageSize: filters.pageSize ?? 20,
  };

  return useQuery({
    queryKey: queryKeys.articles.bookmarks(params),
    queryFn: () => listMyBookmarks(params),
    enabled,
  });
}
