import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  images: string;
}

export function useTeam() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    try {
      const { data, error: fetchError } = await supabase
        .from('team')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;
      setTeam(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { team, loading, error };
}