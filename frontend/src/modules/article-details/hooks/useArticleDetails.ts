import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { detect } from "tinyld";
import { queryKeys } from "../../../api/queryKeys";
import { getArticle } from "../../articles/api/articlesApi";

export const useArticleDetails = (articleId: string) => {
  const query = useQuery({
    queryKey: queryKeys.articles.detail(articleId),
    queryFn: () => getArticle(articleId),
    enabled: !!articleId,
  });

  const detectedLanguage = useMemo(
    () => (query.data?.content ? detect(query.data.content) : "en"),
    [query.data?.content],
  );

  return {
    ...query,
    article: query.data,
    isLoading: query.isLoading,
    error: query.error,
    isError: query.isError,
    detectedLanguage,
  };
};
