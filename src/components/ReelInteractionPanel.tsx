import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Heart, MessageCircle, Share2, Send, User } from "lucide-react";
import { useReelInteractions } from "@/hooks/useReelInteractions";
import { useToast } from "@/hooks/use-toast";
import { formatDistanceToNow } from "date-fns";

interface ReelInteractionPanelProps {
  reelId: string;
  initialLikes?: number;
  initialComments?: number;
}

const ReelInteractionPanel = ({ reelId, initialLikes = 0, initialComments = 0 }: ReelInteractionPanelProps) => {
  const { 
    isLiked, 
    loading, 
    likesCount, 
    commentsCount, 
    comments, 
    toggleLike, 
    addComment 
  } = useReelInteractions(reelId);
  
  const [commentDialogOpen, setCommentDialogOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const handleLike = async () => {
    if (loading) return;
    
    try {
      await toggleLike();
      toast({
        description: isLiked ? "Like removed" : "❤️ Liked!",
        duration: 1500,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Failed to update like. Please try again.",
      });
    }
  };

  const handleCommentSubmit = async () => {
    if (!userName.trim() || !commentText.trim()) {
      toast({
        variant: "destructive",
        description: "Please enter your name and comment.",
      });
      return;
    }

    if (commentText.length > 500) {
      toast({
        variant: "destructive",
        description: "Comment must be 500 characters or less.",
      });
      return;
    }

    try {
      setSubmitting(true);
      await addComment(userName.trim(), commentText.trim());
      setCommentText('');
      toast({
        description: "💬 Comment added successfully!",
        duration: 2000,
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        description: error.message || "Failed to add comment. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'धर्मयुग - Sacred Reel',
          text: 'Check out this amazing spiritual content on Dharmayuga!',
          url: window.location.href,
        });
      } catch (error) {
        // User cancelled or share failed
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      try {
        await navigator.clipboard.writeText(window.location.href);
        toast({
          description: "📋 Link copied to clipboard!",
          duration: 2000,
        });
      } catch (error) {
        toast({
          description: "🔗 Share this amazing content with others!",
          duration: 2000,
        });
      }
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 p-4">
      {/* Like Button */}
      <div className="flex flex-col items-center">
        <Button
          variant="ghost"
          size="lg"
          onClick={handleLike}
          disabled={loading}
          className={`w-12 h-12 rounded-full p-0 transition-all duration-300 ${
            isLiked 
              ? 'bg-red-500/20 hover:bg-red-500/30 text-red-500 scale-110' 
              : 'hover:bg-background/20 text-foreground hover:scale-110'
          }`}
        >
          <Heart 
            className={`w-7 h-7 transition-all duration-300 ${
              isLiked ? 'fill-current' : ''
            }`} 
          />
        </Button>
        <span className="text-sm text-muted-foreground mt-1">
          {likesCount || initialLikes}
        </span>
      </div>

      {/* Comment Button */}
      <div className="flex flex-col items-center">
        <Dialog open={commentDialogOpen} onOpenChange={setCommentDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="lg"
              className="w-12 h-12 rounded-full p-0 hover:bg-background/20 text-foreground hover:scale-110 transition-all duration-300"
            >
              <MessageCircle className="w-7 h-7" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md max-h-[80vh] flex flex-col">
            <DialogHeader>
              <DialogTitle className="text-center sacred-text">
                टिप्पणियां | Comments
              </DialogTitle>
            </DialogHeader>
            
            <div className="flex-1 flex flex-col space-y-4">
              {/* Comments List */}
              <ScrollArea className="flex-1 max-h-60">
                <div className="space-y-3 pr-4">
                  {comments.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">
                      कोई टिप्पणी नहीं | No comments yet
                    </p>
                  ) : (
                    comments.map((comment) => (
                      <div key={comment.id} className="border rounded-lg p-3 bg-card/50">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                            <User className="w-3 h-3" />
                          </div>
                          <span className="font-semibold text-sm text-foreground">
                            {comment.user_name}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground pl-8">
                          {comment.comment_text}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>

              {/* Add Comment Form */}
              <div className="space-y-3 border-t pt-4">
                <Input
                  placeholder="आपका नाम | Your name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  maxLength={100}
                />
                <div className="relative">
                  <Textarea
                    placeholder="अपनी टिप्पणी लिखें... | Write your comment..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    maxLength={500}
                    rows={3}
                    className="resize-none"
                  />
                  <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
                    {commentText.length}/500
                  </div>
                </div>
                <Button
                  onClick={handleCommentSubmit}
                  disabled={submitting || !userName.trim() || !commentText.trim()}
                  className="w-full"
                >
                  {submitting ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      <span>भेजा जा रहा है...</span>
                    </div>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      टिप्पणी भेजें | Send Comment
                    </>
                  )}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        <span className="text-sm text-muted-foreground mt-1">
          {commentsCount || initialComments}
        </span>
      </div>

      {/* Share Button */}
      <div className="flex flex-col items-center">
        <Button
          variant="ghost"
          size="lg"
          onClick={handleShare}
          className="w-12 h-12 rounded-full p-0 hover:bg-background/20 text-foreground hover:scale-110 transition-all duration-300"
        >
          <Share2 className="w-7 h-7" />
        </Button>
        <span className="text-sm text-muted-foreground mt-1">साझा करें</span>
      </div>
    </div>
  );
};

export default ReelInteractionPanel;