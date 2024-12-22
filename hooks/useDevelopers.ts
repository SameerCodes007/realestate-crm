import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface Developer {
  id: string;
  name: string;
  logo: string;
}

export function useDevelopers() {
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDevelopers();
  }, []);

  const fetchDevelopers = async () => {
    try {
      const { data, error: fetchError } = await supabase
        .from('developers')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;
      setDevelopers(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { developers, loading, error };
}