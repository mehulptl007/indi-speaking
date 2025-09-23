import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Scripture {
  id: string;
  name: string;
  category: string;
  description: string | null;
  image_url: string | null;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface ScriptureSection {
  id: string;
  scripture_id: string;
  section_name: string;
  order_index: number;
  created_at: string;
}

export interface ScriptureContent {
  id: string;
  scripture_id: string;
  section_id: string;
  title: string;
  image_url: string | null;
  content: string;
  created_at: string;
  updated_at: string;
}

export const useScriptures = () => {
  const [scriptures, setScriptures] = useState<Scripture[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchScriptures = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('scriptures')
        .select('*')
        .order('order_index');

      if (error) throw error;
      setScriptures(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScriptures();
  }, []);

  const getScripturesByCategory = (category: string) => 
    scriptures.filter(scripture => scripture.category === category);

  return { 
    scriptures, 
    loading, 
    error, 
    refetch: fetchScriptures,
    getScripturesByCategory
  };
};

export const useScriptureSections = (scriptureId: string) => {
  const [sections, setSections] = useState<ScriptureSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSections = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('scripture_sections')
        .select('*')
        .eq('scripture_id', scriptureId)
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
    if (scriptureId) {
      fetchSections();
    }
  }, [scriptureId]);

  return { sections, loading, error, refetch: fetchSections };
};

export const useScriptureContent = (scriptureId: string, sectionId: string) => {
  const [content, setContent] = useState<ScriptureContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContent = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('scripture_content')
        .select('*')
        .eq('scripture_id', scriptureId)
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
    if (scriptureId && sectionId) {
      fetchContent();
    }
  }, [scriptureId, sectionId]);

  return { content, loading, error, refetch: fetchContent };
};