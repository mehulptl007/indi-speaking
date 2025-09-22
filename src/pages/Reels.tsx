import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Heart, Share2, MessageCircle, Play, Pause, Volume2, VolumeX, ArrowLeft, Loader2, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useReels } from "@/hooks/useReels";
import { toast } from "@/hooks/use-toast";

const Reels = () => {
  const navigate = useNavigate();
  const [currentReelIndex, setCurrentReelIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true); // Default muted for autoplay
  const [likedReels, setLikedReels] = useState<Set<string>>(new Set());
  const [videoLoading, setVideoLoading] = useState<Record<number, boolean>>({});
  const [videoError, setVideoError] = useState<Record<number, boolean>>({});
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const { reels, loading, error, updateLikes, updateShares } = useReels();
  const currentReel = reels[currentReelIndex];

  // Initialize video refs array when reels change
  useEffect(() => {
    videoRefs.current = videoRefs.current.slice(0, reels.length);
  }, [reels.length]);

  // Auto play current video when reel changes
  useEffect(() => {
    const currentVideo = videoRefs.current[currentReelIndex];
    if (currentVideo && currentReel) {
      setVideoLoading(prev => ({ ...prev, [currentReelIndex]: true }));
      setVideoError(prev => ({ ...prev, [currentReelIndex]: false }));
      currentVideo.currentTime = 0;
      
      // Pause all other videos
      videoRefs.current.forEach((video, index) => {
        if (video && index !== currentReelIndex) {
          video.pause();
        }
      });
      
      const playVideo = async () => {
        try {
          await currentVideo.play();
          setIsPlaying(true);
        } catch (error) {
          console.log('Video autoplay failed:', error);
          setIsPlaying(false);
        }
      };
      
      playVideo();
    }
  }, [currentReelIndex, currentReel]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const togglePlay = async () => {
    const currentVideo = videoRefs.current[currentReelIndex];
    if (currentVideo) {
      try {
        if (isPlaying) {
          currentVideo.pause();
          setIsPlaying(false);
        } else {
          await currentVideo.play();
          setIsPlaying(true);
        }
      } catch (error) {
        console.log('Video play/pause failed:', error);
        setVideoError(prev => ({ ...prev, [currentReelIndex]: true }));
      }
    }
  };

  const toggleMute = () => {
    const currentVideo = videoRefs.current[currentReelIndex];
    if (currentVideo) {
      currentVideo.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVideoLoad = (index: number) => {
    setVideoLoading(prev => ({ ...prev, [index]: false }));
    setVideoError(prev => ({ ...prev, [index]: false }));
  };

  const handleVideoError = (index: number) => {
    setVideoLoading(prev => ({ ...prev, [index]: false }));
    setVideoError(prev => ({ ...prev, [index]: true }));
  };

  const handleSwipeUp = () => {
    if (currentReelIndex < reels.length - 1) {
      const newIndex = currentReelIndex + 1;
      setCurrentReelIndex(newIndex);
      setVideoLoading(prev => ({ ...prev, [newIndex]: true }));
      setVideoError(prev => ({ ...prev, [newIndex]: false }));
    }
  };

  const handleSwipeDown = () => {
    if (currentReelIndex > 0) {
      const newIndex = currentReelIndex - 1;
      setCurrentReelIndex(newIndex);
      setVideoLoading(prev => ({ ...prev, [newIndex]: true }));
      setVideoError(prev => ({ ...prev, [newIndex]: false }));
    }
  };

  const handleLike = async (reelId: string) => {
    const isCurrentlyLiked = likedReels.has(reelId);
    
    if (isCurrentlyLiked) {
      setLikedReels(prev => {
        const newSet = new Set(prev);
        newSet.delete(reelId);
        return newSet;
      });
      await updateLikes(reelId, false);
    } else {
      setLikedReels(prev => new Set([...prev, reelId]));
      await updateLikes(reelId, true);
      toast({
        title: "रील को लाइक किया गया!",
        description: "आपने इस रील को पसंद किया है।",
      });
    }
  };

  const handleShare = async (reelId: string) => {
    await updateShares(reelId);
    toast({
      title: "रील शेयर किया गया!",
      description: "इस रील को सफलतापूर्वक साझा किया गया।",
    });
    
    // Web Share API if available
    if (navigator.share) {
      try {
        await navigator.share({
          title: currentReel?.title,
          text: currentReel?.description,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    }
  };

  const formatCount = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <div className="text-center text-white">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p>लोड हो रहा है...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <div className="text-center text-white">
          <p className="mb-4">कुछ त्रुटि हुई है: {error}</p>
          <Button onClick={() => window.location.reload()}>
            पुनः प्रयास करें
          </Button>
        </div>
      </div>
    );
  }

  if (reels.length === 0) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <div className="text-center text-white">
          <p>कोई रील उपलब्ध नहीं है</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/50 to-transparent p-4">
        <div className="flex items-center justify-between">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate("/")}
            className="text-white hover:bg-white/20"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            वापस
          </Button>
          <h1 className="text-white font-semibold">रील्स</h1>
          <div className="w-20"></div>
        </div>
      </div>

      {/* Main Reel Container */}
      <div 
        ref={containerRef}
        className="relative w-full h-full transition-transform duration-300 ease-out"
        style={{ transform: `translateY(-${currentReelIndex * 100}vh)` }}
      >
        {reels.map((reel, index) => (
          <div
            key={reel.id}
            className="absolute inset-0 w-full h-full"
            style={{ top: `${index * 100}vh` }}
          >
            {/* Video Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-cosmic-purple via-cosmic-blue to-background">
              <div className="absolute inset-0 bg-black/20"></div>
              
              {/* Video Element */}
              {reel.video_url && !videoError[index] ? (
                <>
                  <video
                    ref={(el) => (videoRefs.current[index] = el)}
                    src={reel.video_url}
                    className="absolute inset-0 w-full h-full object-cover"
                    loop
                    muted={isMuted}
                    playsInline
                    preload="metadata"
                    onLoadedData={() => handleVideoLoad(index)}
                    onError={() => handleVideoError(index)}
                    onLoadStart={() => setVideoLoading(prev => ({ ...prev, [index]: true }))}
                    poster={reel.thumbnail_url}
                  />
                  
                  {/* Video Loading Indicator */}
                  {videoLoading[index] && index === currentReelIndex && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                      <Loader2 className="w-12 h-12 text-white animate-spin" />
                    </div>
                  )}
                </>
              ) : (
                /* Fallback - Show thumbnail or placeholder */
                <div className="absolute inset-0">
                  {reel.thumbnail_url && !videoError[index] ? (
                    <img 
                      src={reel.thumbnail_url} 
                      alt={reel.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-white/80">
                        <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center">
                          {videoError[index] ? (
                            <AlertCircle className="w-12 h-12 text-red-400" />
                          ) : (
                            <Play className="w-12 h-12" />
                          )}
                        </div>
                        <p className="text-lg">
                          {videoError[index] ? "वीडियो लोड नहीं हो सका" : "Video Player"}
                        </p>
                        <p className="text-sm mt-2">{reel.title}</p>
                        {videoError[index] && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="mt-4"
                            onClick={() => {
                              setVideoError(prev => ({ ...prev, [index]: false }));
                              setVideoLoading(prev => ({ ...prev, [index]: true }));
                              const video = videoRefs.current[index];
                              if (video) {
                                video.load();
                              }
                            }}
                          >
                            पुनः प्रयास करें
                          </Button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Controls Overlay */}
            <div 
              className="absolute inset-0 z-10"
              onClick={togglePlay}
            >
              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-black/50 flex items-center justify-center">
                    <Play className="w-8 h-8 text-white ml-1" />
                  </div>
                </div>
              )}
            </div>

            {/* Right Side Actions */}
            <div className="absolute right-4 bottom-20 flex flex-col items-center space-y-6 z-20">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleLike(reel.id)}
                className={`w-12 h-12 rounded-full bg-black/30 text-white hover:bg-black/50 flex flex-col p-0 ${
                  likedReels.has(reel.id) ? 'text-red-500' : ''
                }`}
              >
                <Heart className={`w-6 h-6 mb-1 ${likedReels.has(reel.id) ? 'fill-current' : ''}`} />
                <span className="text-xs">{formatCount(reel.likes_count)}</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="w-12 h-12 rounded-full bg-black/30 text-white hover:bg-black/50 flex flex-col p-0"
              >
                <MessageCircle className="w-6 h-6 mb-1" />
                <span className="text-xs">{formatCount(reel.comments_count)}</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleShare(reel.id)}
                className="w-12 h-12 rounded-full bg-black/30 text-white hover:bg-black/50 flex flex-col p-0"
              >
                <Share2 className="w-6 h-6 mb-1" />
                <span className="text-xs">{formatCount(reel.shares_count)}</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMute();
                }}
                className="w-12 h-12 rounded-full bg-black/30 text-white hover:bg-black/50"
              >
                {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
              </Button>
            </div>

            {/* Bottom Content */}
            <div className="absolute bottom-4 left-4 right-16 z-20">
              <h3 className="text-white font-semibold text-lg mb-2">
                {reel.title}
              </h3>
              <p className="text-white/80 text-sm leading-relaxed">
                {reel.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Swipe Indicators */}
      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 z-30">
        <div className="flex flex-col items-center space-y-2">
          {currentReelIndex > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSwipeDown}
              className="w-8 h-8 rounded-full bg-black/30 text-white hover:bg-black/50 p-0"
            >
              ↑
            </Button>
          )}
          
          <div className="flex flex-col space-y-1">
            {reels.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentReelIndex(index)}
                className={`w-1 h-6 rounded-full transition-colors ${
                  index === currentReelIndex ? 'bg-white' : 'bg-white/30'
                }`}
              />
            ))}
          </div>

          {currentReelIndex < reels.length - 1 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSwipeUp}
              className="w-8 h-8 rounded-full bg-black/30 text-white hover:bg-black/50 p-0"
            >
              ↓
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reels;