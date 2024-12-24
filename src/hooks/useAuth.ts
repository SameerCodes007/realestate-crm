import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { User } from '@supabase/supabase-js';

export function useAuth() {
  const [authState, setAuthState] = useState<{
    user: User | null;
    loading: boolean;
    initialized: boolean;
    error: Error | null;
  }>({
    user: null,
    loading: true,
    initialized: false,
    error: null
  });

  useEffect(() => {
    const getInitialSession = async () => {
      try {
        const token = localStorage.getItem('token');
        const { data, error: authError } = await supabase.auth.getUser(token || undefined);
        
        if (authError) {
          localStorage.removeItem('token');
          throw authError;
        }

        setAuthState({
          user: data.user,
          loading: false,
          initialized: true,
          error: null
        });
      } catch (error) {
        console.error('Error getting user:', error);
        setAuthState({
          user: null,
          loading: false,
          initialized: true,
          error: error instanceof Error ? error : new Error('Authentication error')
        });
      }
    };

    getInitialSession();
  }, []);

  return {
    user: authState.initialized ? authState.user : null,
    loading: authState.loading,
    error: authState.error,
    isInitialized: authState.initialized
  };
}