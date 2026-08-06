import { supabase } from '../../../supabaseClient';

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

interface ReactionCounts {
  likes: number | null;
  dislikes: number | null;
}

export const fetchArticleDetails = async (articleId: string): Promise<Article> => {
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("id", articleId)
    .single();

  if (error) {
    throw new Error(`Failed to fetch article: ${error.message}`);
  }

  if (!data) {
    throw new Error('Article not found');
  }

  return data;
};

export const getReactionCounts = async (articleId: string): Promise<ReactionCounts> => {
  const { data } = await supabase
    .from("article_reaction_counts")
    .select("likes, dislikes")
    .eq("article_id", articleId)
    .maybeSingle();

  return {
    likes: data?.likes ?? 0,
    dislikes: data?.dislikes ?? 0,
  };
};

export const addReaction = async (
  articleId: string, 
  userId: string, 
  reactionType: 'like' | 'dislike'
): Promise<void> => {
  const { error } = await supabase
    .from("article_reactions")
    .upsert([{ 
      article_id: articleId, 
      user_id: userId, 
      reaction: reactionType 
    }], { onConflict: "article_id,user_id" });

  if (error) {
    throw new Error(`Failed to ${reactionType} article: ${error.message}`);
  }
};
