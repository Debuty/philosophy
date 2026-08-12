import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../api/queryKeys";
import { listRelatedArticles } from "../../articles/api/articlesApi";

export function useRelatedArticles(articleId: string, limit = 3) {
  return useQuery({
    queryKey: queryKeys.articles.related(articleId, limit),
    queryFn: () => listRelatedArticles(articleId, limit),
    enabled: !!articleId,
  });
}
