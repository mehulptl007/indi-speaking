import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface HeroPage {
  id: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  background_image_url: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const useHeroPages = () => {
  const [heroPages, setHeroPages] = useState<HeroPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHeroPages = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('hero_pages')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (error) throw error;
      setHeroPages(data || []);
    } catch (err: any) {
      setError(err.message);
      console.error('Error fetching hero pages:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHeroPages();
  }, []);

  return {
    heroPages,
    loading,
    error,
    refetch: fetchHeroPages
  };
};