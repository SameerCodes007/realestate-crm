import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface Property {
  id: string;
  builder_name: string;
  project: string;
  location: string;
  size: string;
  price: number;
  images: string[];
  created_at: string;
}

export function useProperties(type: 'resale' | 'primary_sale' | 'rental') {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProperties();
  }, [type]);

  const fetchProperties = async () => {
    try {
      const { data, error: fetchError } = await supabase
        .from(`${type}_properties`)
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;
      setProperties(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { properties, loading, error, refetch: fetchProperties };
}