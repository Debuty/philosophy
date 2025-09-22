import { useEffect, useState } from 'react';
import type { User } from '@supabase/supabase-js';
import { getCurrentUser } from '../../../utils/auth';

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getCurrentUser().then(setUser);
  }, []);

  return user;
};
