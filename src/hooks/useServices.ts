import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface Service {
  id: string;
  title: string;
  description: string;
  images: string;
}

export function useServices(type: 'construction' | 'interior') {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchServices();
  }, [type]);

  const fetchServices = async () => {
    try {
      const { data, error: fetchError } = await supabase
        .from(`${type}_services`)
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;
      setServices(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { services, loading, error };
}