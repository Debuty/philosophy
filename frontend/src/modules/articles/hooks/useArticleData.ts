import { useMemo } from "react";
import type { ArticleListItem, ProcessedArticle } from "../types";

export type { ProcessedArticle };

export const useArticleData = (
  articles: ArticleListItem[] | undefined,
): ProcessedArticle[] => {
  return useMemo(() => {
    if (!articles) return [];

    return articles.map((article) => ({
      article,
      author: article.profiles,
      reactionCounts: article.article_reaction_counts,
    }));
  }, [articles]);
};
