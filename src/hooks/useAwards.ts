import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface Award {
  id: string;
  title: string;
  images: string;
}

export function useAwards() {
  const [awards, setAwards] = useState<Award[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAwards();
  }, []);

  const fetchAwards = async () => {
    try {
      const { data, error: fetchError } = await supabase
        .from('awards_services')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;
      setAwards(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { awards, loading, error };
}