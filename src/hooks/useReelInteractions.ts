import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

// Generate or get session ID for anonymous users
const getSessionId = () => {
  let sessionId = localStorage.getItem('user_session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('user_session_id', sessionId);
  }
  return sessionId;
};

interface ReelLike {
  id: string;
  reel_id: string;
  user_session_id: string;
  created_at: string;
}

interface ReelComment {
  id: string;
  reel_id: string;
  user_name: string;
  comment_text: string;
  created_at: string;
  updated_at: string;
}

export const useReelInteractions = (reelId: string) => {
  const [likes, setLikes] = useState<ReelLike[]>([]);
  const [comments, setComments] = useState<ReelComment[]>([]);
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(false);
  const sessionId = getSessionId();

  // Fetch likes for a reel
  const fetchLikes = async () => {
    try {
      const { data, error } = await supabase
        .from('reel_likes')
        .select('*')
        .eq('reel_id', reelId);

      if (error) throw error;
      setLikes(data || []);
      
      // Check if current session has liked this reel
      const userLiked = data?.some(like => like.user_session_id === sessionId);
      setIsLiked(!!userLiked);
    } catch (err) {
      console.error('Error fetching likes:', err);
    }
  };

  // Fetch comments for a reel
  const fetchComments = async () => {
    try {
      const { data, error } = await supabase
        .from('reel_comments')
        .select('*')
        .eq('reel_id', reelId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setComments(data || []);
    } catch (err) {
      console.error('Error fetching comments:', err);
    }
  };

  // Toggle like for a reel
  const toggleLike = async () => {
    try {
      setLoading(true);
      
      if (isLiked) {
        // Remove like
        const { error } = await supabase
          .from('reel_likes')
          .delete()
          .eq('reel_id', reelId)
          .eq('user_session_id', sessionId);

        if (error) throw error;
        
        // Update local state
        setLikes(prev => prev.filter(like => like.user_session_id !== sessionId));
        setIsLiked(false);
        
        // Update reel likes_count
        const { data: currentReel } = await supabase
          .from('reels')
          .select('likes_count')
          .eq('id', reelId)
          .single();
        
        if (currentReel) {
          await supabase
            .from('reels')
            .update({ likes_count: Math.max(0, (currentReel.likes_count || 0) - 1) })
            .eq('id', reelId);
        }
      } else {
        // Add like
        const { error } = await supabase
          .from('reel_likes')
          .insert({
            reel_id: reelId,
            user_session_id: sessionId
          });

        if (error) throw error;
        
        setIsLiked(true);
        
        // Update reel likes_count
        const { data: currentReel } = await supabase
          .from('reels')
          .select('likes_count')
          .eq('id', reelId)
          .single();
        
        if (currentReel) {
          await supabase
            .from('reels')
            .update({ likes_count: (currentReel.likes_count || 0) + 1 })
            .eq('id', reelId);
        }
      }
    } catch (err) {
      console.error('Error toggling like:', err);
    } finally {
      setLoading(false);
    }
  };

  // Add comment to a reel
  const addComment = async (userName: string, commentText: string) => {
    try {
      setLoading(true);
      
      if (commentText.length > 500) {
        throw new Error('Comment must be 500 characters or less');
      }

      const { data, error } = await supabase
        .from('reel_comments')
        .insert({
          reel_id: reelId,
          user_name: userName.trim(),
          comment_text: commentText.trim()
        })
        .select()
        .single();

      if (error) throw error;
      
      // Add to local state
      setComments(prev => [data, ...prev]);
      
      // Update reel comments_count
      const { data: currentReel } = await supabase
        .from('reels')
        .select('comments_count')
        .eq('id', reelId)
        .single();
      
      if (currentReel) {
        await supabase
          .from('reels')
          .update({ comments_count: (currentReel.comments_count || 0) + 1 })
          .eq('id', reelId);
      }
    } catch (err: any) {
      console.error('Error adding comment:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (reelId) {
      fetchLikes();
      fetchComments();
    }
  }, [reelId]);

  return {
    likes,
    comments,
    isLiked,
    loading,
    likesCount: likes.length,
    commentsCount: comments.length,
    toggleLike,
    addComment,
    refetch: () => {
      fetchLikes();
      fetchComments();
    }
  };
};