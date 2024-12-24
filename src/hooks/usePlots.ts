import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface Plot {
  id: string;
  builder_name: string;
  project: string;
  location: string;
  price_per_sqft: number;
  total_price: string;
  images: string[];
}

export function usePlots() {
  const [plots, setPlots] = useState<Plot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPlots();
  }, []);

  const fetchPlots = async () => {
    try {
      const { data, error: fetchError } = await supabase
        .from('plots')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;
      setPlots(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { plots, loading, error, refetch: fetchPlots };
}