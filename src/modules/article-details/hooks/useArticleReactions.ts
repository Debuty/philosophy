import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { toast } from 'react-toastify';
import { getReactionCounts, addReaction } from '../services/articleService';

// Define types locally for now
interface ReactionCounts {
  likes: number | null;
  dislikes: number | null;
}

export const useArticleReactions = (articleId: string, userId: string | null) => {
  const queryClient = useQueryClient();
  
  const { data: counts } = useQuery({
    queryKey: ['article_reaction_counts', articleId],
    queryFn: () => getReactionCounts(articleId),
    enabled: !!articleId,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  const handleReaction = useCallback(async (reactionType: 'like' | 'dislike') => {
    if (!userId) {
      toast.error('Please log in to react to articles');
      return;
    }

    try {
      await addReaction(articleId, userId, reactionType);
      
      queryClient.invalidateQueries({ 
        queryKey: ['article_reaction_counts', articleId] 
      });
    } catch (error) {
      toast.error(`Failed to ${reactionType} article`);
    }
  }, [articleId, userId, queryClient]);

  return { 
    counts: counts || { likes: 0, dislikes: 0 }, 
    handleReaction 
  };
};
