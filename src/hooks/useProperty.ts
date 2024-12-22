import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Property } from './useProperties';

export function useProperty(type: 'resale' | 'primary_sale' | 'rental', id: string) {
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProperty();
  }, [type, id]);

  const fetchProperty = async () => {
    try {
      const { data, error: fetchError } = await supabase
        .from(`${type}_properties`)
        .select('*')
        .eq('id', id)
        .single();

      if (fetchError) throw fetchError;
      setProperty(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { property, loading, error };
}