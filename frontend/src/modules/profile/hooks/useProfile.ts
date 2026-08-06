import { useQuery } from '@tanstack/react-query';
import { supabase } from '../../../supabaseClient';
import type { User } from '@supabase/supabase-js';

export const useProfile = (user: User | null) => {
  const getProfile = async () => {
    if (!user) return null;
    
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();
    
    if (error) throw error;
    return data;
  };

  return useQuery({
    queryKey: ['profile', user?.id],
    queryFn: getProfile,
    refetchOnWindowFocus: false
  });
};
