import { useQuery } from '@tanstack/react-query';
import { supabase } from '../../../supabaseClient';

interface AuthorInfo {
  username: string | null;
  bio: string | null;
}

interface ReactionCounts {
  likes: number | null;
  dislikes: number | null;
}

export interface Article {
  id: string;
  title: string;
  subtitle: string;
  content?: string;
  category: string;
  created_at: string;
  state?: string;
  author_id: string;
  profiles?: AuthorInfo | AuthorInfo[] | null;
  article_reaction_counts?: ReactionCounts | ReactionCounts[] | null;
}

const getArticles = async (): Promise<Article[]> => {
  const { data, error } = await supabase
    .from('articles')
    .select(
      'id,state,title,subtitle,content,category,created_at,author_id,profiles(username,bio),article_reaction_counts(likes,dislikes)'
    )
    .eq('state', 'published');

  if (error) {
    throw error;
  }

  return data ?? [];
};

export const useArticles = () => {
  return useQuery<Article[]>({
    queryKey: ['articles'],
    queryFn: getArticles,
  });
};
