import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../api/queryKeys";
import { listArticles } from "../api/articlesApi";
import type { ListArticlesParams } from "../types";

export function useArticlesList(filters: ListArticlesParams = {}) {
  return useQuery({
    queryKey: queryKeys.articles.list(filters),
    queryFn: () => listArticles(filters),
  });
}

/** @deprecated Prefer useArticlesList — kept for gradual import updates */
export function useArticles() {
  return useArticlesList({ page: 1, pageSize: 50 });
}
