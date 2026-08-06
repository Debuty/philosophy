import { useQuery } from '@tanstack/react-query';
import { getProfileById } from '../services/profileService';

export const useArticleAuthor = (authorId: string | undefined) => {
  const { data: authorProfile, isLoading, error } = useQuery({
    queryKey: ['profile', authorId],
    queryFn: () => getProfileById(authorId!),
    enabled: !!authorId,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });

  return { 
    authorProfile: authorProfile || null, 
    isLoading, 
    error 
  };
};
