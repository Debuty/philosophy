import { supabase } from '../../../supabaseClient';

// Define types locally for now
interface Profile {
  id: string;
  username: string | null;
  bio: string | null;
  avatar_url?: string | null;
  created_at?: string;
  updated_at?: string;
}

export const getProfileById = async (userId: string): Promise<Profile | null> => {
  if (!userId) return null;
  
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
    
  if (error) {
    throw new Error(`Failed to fetch profile: ${error.message}`);
  }
  
  return data;
};
