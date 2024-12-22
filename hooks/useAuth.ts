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
    let mounted = true;

    // Get initial session
    const getInitialSession = async () => {
      try {
        const token = localStorage.getItem('token') || '';
        const { data, error: authError } = await supabase.auth.getUser(token);
        
        if (authError) {
          throw authError;
        }

        if (mounted) {
          setAuthState({
            user: data.user,
            loading: false,
            initialized: true,
            error: null
          });
        }
      } catch (error) {
        if (mounted) {
          console.error('Error getting session:', error);
          setAuthState({
            user: null,
            loading: false,
            initialized: true,
            error: error instanceof Error ? error : new Error('Authentication error')
          });
        }
      }
    };

    // Start loading session
    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (mounted) {
        setAuthState(current => ({
          ...current,
          user: session?.user ?? null,
          loading: false,
          initialized: true
        }));
      }
    });

    // Cleanup function
    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // Only return the user if we've actually initialized
  return {
    user: authState.initialized ? authState.user : null,
    loading: authState.loading,
    error: authState.error,
    isInitialized: authState.initialized
  };
}