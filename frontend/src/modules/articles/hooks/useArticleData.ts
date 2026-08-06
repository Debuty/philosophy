import { useMemo } from 'react';
import type { Article } from './useArticles';

export interface ProcessedArticle {
  article: Article;
  author?: {
    username: string | null;
    bio: string | null;
  };
  reactionCounts?: {
    likes: number | null;
    dislikes: number | null;
  };
}

export const useArticleData = (articles: Article[] | undefined): ProcessedArticle[] => {
  return useMemo(() => {
    if (!articles) return [];

    return articles.map((article) => {
      const author = Array.isArray(article.profiles)
        ? article.profiles[0]
        : article.profiles;
      
      const counts = Array.isArray(article.article_reaction_counts)
        ? article.article_reaction_counts[0]
        : article.article_reaction_counts;

      return {
        article,
        author: author ?? undefined,
        reactionCounts: counts ?? undefined,
      };
    });
  }, [articles]);
};
