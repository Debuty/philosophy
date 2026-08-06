import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { toast } from 'react-toastify';
import { fetchComments, addComment as addCommentService } from '../services/commentService';

export const useComments = (articleId: string) => {
  const queryClient = useQueryClient();
  
  const { data: comments } = useQuery({
    queryKey: ['comments', articleId],
    queryFn: () => fetchComments(articleId),
    enabled: !!articleId,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  const addComment = useCallback(async (content: string, userId: string) => {
    try {
      await addCommentService(articleId, content, userId);
      
      queryClient.invalidateQueries({ 
        queryKey: ['comments', articleId] 
      });
    } catch (error) {
      toast.error('Failed to add comment');
      throw error;
    }
  }, [articleId, queryClient]);

  return { 
    comments: comments || [], 
    addComment 
  };
};
