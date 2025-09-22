import { useEffect, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '../../../../supabaseClient';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../../routes/pathes';
import { debugLog } from '../../../../utils/debug';

export const useAuth = () => {
  const [session, setSession] = useState<Session | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (window.location.pathname === "/reset-password") {
        return;
      }
      setSession(session || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    navigate(ROUTES.LOGIN);
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error.message);
    } else {
      debugLog('User signed out successfully');
    }
  };

  return {
    session,
    handleLogout,
  };
};
