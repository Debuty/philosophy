import { supabase } from '../../../supabaseClient';

// Define types locally for now
interface Comment {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
  article_id: string;
  profiles: { username: string } | null;
}

export const fetchComments = async (articleId: string): Promise<Comment[]> => {
  const { data, error } = await supabase
    .from("comments")
    .select("id, content, created_at, user_id, profiles!comments_user_id_fkey1(username)")
    .eq("article_id", articleId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch comments: ${error.message}`);
  }

  return (data || []).map(comment => ({
    ...comment,
    article_id: articleId,
    profiles: Array.isArray(comment.profiles) ? comment.profiles[0] : comment.profiles
  }));
};

export const addComment = async (
  articleId: string, 
  content: string, 
  userId: string
): Promise<Comment> => {
  const { data, error } = await supabase
    .from("comments")
    .insert([{ 
      article_id: articleId, 
      content, 
      user_id: userId 
    }])
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to add comment: ${error.message}`);
  }

  return data;
};
