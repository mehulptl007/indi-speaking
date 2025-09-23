import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface God {
  id: string;
  name: string;
  description: string | null;
  image_url: string | null;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface GodSection {
  id: string;
  god_id: string;
  section_name: string;
  order_index: number;
  created_at: string;
}

export interface GodContent {
  id: string;
  god_id: string;
  section_id: string;
  title: string;
  image_url: string | null;
  content: string;
  created_at: string;
  updated_at: string;
}

export const useGods = () => {
  const [gods, setGods] = useState<God[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGods = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('gods')
        .select('*')
        .order('order_index');

      if (error) throw error;
      setGods(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGods();
  }, []);

  return { gods, loading, error, refetch: fetchGods };
};

export const useGodSections = (godId: string) => {
  const [sections, setSections] = useState<GodSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSections = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('god_sections')
        .select('*')
        .eq('god_id', godId)
        .order('order_index');

      if (error) throw error;
      setSections(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (godId) {
      fetchSections();
    }
  }, [godId]);

  return { sections, loading, error, refetch: fetchSections };
};

export const useGodContent = (godId: string, sectionId: string) => {
  const [content, setContent] = useState<GodContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContent = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('god_content')
        .select('*')
        .eq('god_id', godId)
        .eq('section_id', sectionId)
        .single();

      if (error) throw error;
      setContent(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (godId && sectionId) {
      fetchContent();
    }
  }, [godId, sectionId]);

  return { content, loading, error, refetch: fetchContent };
};