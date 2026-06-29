import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { detect } from 'tinyld';
import { fetchArticleDetails } from '../services/articleService';

// Define types locally for now
interface Article {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  category: string;
  state?: string;
  author_id: string;
  created_at: string;
}

export const useArticleDetails = (articleId: string) => {
  const query = useQuery({
    queryKey: ['article', articleId],
    queryFn: () => fetchArticleDetails(articleId),
    refetchOnWindowFocus: false,
    enabled: !!articleId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: (failureCount, error) => {
      // Don't retry for 404 errors
      if (error.message.includes('not found')) {
        return false;
      }
      return failureCount < 2;
    },
  });

  const detectedLanguage = useMemo(() => 
    query.data?.content ? detect(query.data.content) : 'en', 
    [query.data?.content]
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
