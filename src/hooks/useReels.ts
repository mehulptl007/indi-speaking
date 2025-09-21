import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface ReelData {
  id: string;
  title: string;
  description: string;
  video_url: string;
  thumbnail_url?: string;
  likes_count: number;
  comments_count: number;
  shares_count: number;
  category: string;
  uploaded_by?: string;
  created_at: string;
}

export const useReels = () => {
  const [reels, setReels] = useState<ReelData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReels = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('reels')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setReels(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const updateLikes = async (reelId: string, increment: boolean = true) => {
    try {
      const reel = reels.find(r => r.id === reelId);
      if (!reel) return;

      const newLikesCount = increment ? reel.likes_count + 1 : Math.max(0, reel.likes_count - 1);

      const { error } = await supabase
        .from('reels')
        .update({ likes_count: newLikesCount })
        .eq('id', reelId);

      if (error) throw error;

      // Update local state
      setReels(prev => prev.map(r => 
        r.id === reelId ? { ...r, likes_count: newLikesCount } : r
      ));

    } catch (err) {
      console.error('Error updating likes:', err);
    }
  };

  const updateShares = async (reelId: string) => {
    try {
      const reel = reels.find(r => r.id === reelId);
      if (!reel) return;

      const newSharesCount = reel.shares_count + 1;

      const { error } = await supabase
        .from('reels')
        .update({ shares_count: newSharesCount })
        .eq('id', reelId);

      if (error) throw error;

      // Update local state
      setReels(prev => prev.map(r => 
        r.id === reelId ? { ...r, shares_count: newSharesCount } : r
      ));

    } catch (err) {
      console.error('Error updating shares:', err);
    }
  };

  useEffect(() => {
    fetchReels();
  }, []);

  return {
    reels,
    loading,
    error,
    refetch: fetchReels,
    updateLikes,
    updateShares
  };
};