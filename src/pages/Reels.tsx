import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, Volume2, VolumeX, ArrowLeft, Loader2, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useReels } from "@/hooks/useReels";
import ReelInteractionPanel from "@/components/ReelInteractionPanel";
const Reels = () => {
  const navigate = useNavigate();
  const [currentReelIndex, setCurrentReelIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true); // Default muted for autoplay
  const [videoLoading, setVideoLoading] = useState<Record<number, boolean>>({});
  const [videoError, setVideoError] = useState<Record<number, boolean>>({});
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const { reels, loading, error } = useReels();
  const currentReel = reels[currentReelIndex];

  // Initialize video refs array when reels change
  useEffect(() => {
    videoRefs.current = videoRefs.current.slice(0, reels.length);
  }, [reels.length]);

  // Auto play current video when reel changes
  useEffect(() => {
    const currentVideo = videoRefs.current[currentReelIndex];
    if (currentVideo && currentReel) {
      setVideoLoading(prev => ({
        ...prev,
        [currentReelIndex]: true
      }));
      setVideoError(prev => ({
        ...prev,
        [currentReelIndex]: false
      }));
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

  // Handle keyboard navigation and swipe gestures
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      } else if (e.code === 'ArrowUp') {
        e.preventDefault();
        handleSwipeUp();
      } else if (e.code === 'ArrowDown') {
        e.preventDefault();
        handleSwipeDown();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [currentReelIndex, reels.length]);

  // Touch event handlers for swipe gestures
  useEffect(() => {
    let startY = 0;
    let startTime = 0;
    const threshold = 50; // minimum distance for a swipe
    const maxTime = 300; // maximum time for a swipe

    const handleTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
      startTime = Date.now();
    };
    const handleTouchEnd = (e: TouchEvent) => {
      const endY = e.changedTouches[0].clientY;
      const endTime = Date.now();
      const distance = startY - endY;
      const duration = endTime - startTime;
      if (Math.abs(distance) > threshold && duration < maxTime) {
        if (distance > 0) {
          // Swipe up - next reel
          handleSwipeUp();
        } else {
          // Swipe down - previous reel
          handleSwipeDown();
        }
      }
    };

    // Mouse wheel event for desktop
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (e.deltaY > 0) {
        // Scroll down - next reel
        handleSwipeUp();
      } else {
        // Scroll up - previous reel
        handleSwipeDown();
      }
    };
    const container = containerRef.current;
    if (container) {
      container.addEventListener('touchstart', handleTouchStart, {
        passive: true
      });
      container.addEventListener('touchend', handleTouchEnd, {
        passive: true
      });
      container.addEventListener('wheel', handleWheel, {
        passive: false
      });
    }
    return () => {
      if (container) {
        container.removeEventListener('touchstart', handleTouchStart);
        container.removeEventListener('touchend', handleTouchEnd);
        container.removeEventListener('wheel', handleWheel);
      }
    };
  }, [currentReelIndex, reels.length]);
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
        setVideoError(prev => ({
          ...prev,
          [currentReelIndex]: true
        }));
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
    setVideoLoading(prev => ({
      ...prev,
      [index]: false
    }));
    setVideoError(prev => ({
      ...prev,
      [index]: false
    }));
  };
  const handleVideoError = (index: number) => {
    setVideoLoading(prev => ({
      ...prev,
      [index]: false
    }));
    setVideoError(prev => ({
      ...prev,
      [index]: true
    }));
  };
  const handleSwipeUp = () => {
    if (currentReelIndex < reels.length - 1) {
      const newIndex = currentReelIndex + 1;
      setCurrentReelIndex(newIndex);
      setVideoLoading(prev => ({
        ...prev,
        [newIndex]: true
      }));
      setVideoError(prev => ({
        ...prev,
        [newIndex]: false
      }));
    }
  };
  const handleSwipeDown = () => {
    if (currentReelIndex > 0) {
      const newIndex = currentReelIndex - 1;
      setCurrentReelIndex(newIndex);
      setVideoLoading(prev => ({
        ...prev,
        [newIndex]: true
      }));
      setVideoError(prev => ({
        ...prev,
        [newIndex]: false
      }));
    }
  };
  
  const formatCount = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };
  if (loading) {
    return <div className="fixed inset-0 bg-black flex items-center justify-center">
        <div className="text-center text-white">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p>लोड हो रहा है...</p>
        </div>
      </div>;
  }
  if (error) {
    return <div className="fixed inset-0 bg-black flex items-center justify-center">
        <div className="text-center text-white">
          <p className="mb-4">कुछ त्रुटि हुई है: {error}</p>
          <Button onClick={() => window.location.reload()}>
            पुनः प्रयास करें
          </Button>
        </div>
      </div>;
  }
  if (reels.length === 0) {
    return <div className="fixed inset-0 bg-black flex items-center justify-center">
        <div className="text-center text-white">
          <p>कोई रील उपलब्ध नहीं है</p>
        </div>
      </div>;
  }
  return <div className="fixed inset-0 bg-black overflow-hidden">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/50 to-transparent p-4">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={() => navigate("/")} className="text-white hover:bg-white/20">
            <ArrowLeft className="w-5 h-5 mr-2" />
            वापस
          </Button>
          <h1 className="text-white font-semibold">रील्स</h1>
          <div className="w-20"></div>
        </div>
      </div>

      {/* Main Reel Container */}
      <div ref={containerRef} className="relative w-full h-full transition-transform duration-300 ease-out" style={{
      transform: `translateY(-${currentReelIndex * 100}vh)`
    }}>
        {reels.map((reel, index) => <div key={reel.id} className="absolute inset-0 w-full h-full" style={{
        top: `${index * 100}vh`
      }}>
            {/* Video Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-cosmic-purple via-cosmic-blue to-background">
              <div className="absolute inset-0 bg-black/20"></div>
              
              {/* Video Element */}
              {reel.video_url && !videoError[index] ? <>
                  <video ref={el => videoRefs.current[index] = el} src={reel.video_url} className="absolute inset-0 w-full h-full object-cover" loop muted={isMuted} playsInline preload="metadata" onLoadedData={() => handleVideoLoad(index)} onError={() => handleVideoError(index)} onLoadStart={() => setVideoLoading(prev => ({
              ...prev,
              [index]: true
            }))} poster={reel.thumbnail_url} />
                  
                  {/* Video Loading Indicator */}
                  {videoLoading[index] && index === currentReelIndex && <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                      <Loader2 className="w-12 h-12 text-white animate-spin" />
                    </div>}
                </> : (/* Fallback - Show thumbnail or placeholder */
          <div className="absolute inset-0">
                  {reel.thumbnail_url && !videoError[index] ? <img src={reel.thumbnail_url} alt={reel.title} className="absolute inset-0 w-full h-full object-cover" /> : <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-white/80">
                        <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center">
                          {videoError[index] ? <AlertCircle className="w-12 h-12 text-red-400" /> : <Play className="w-12 h-12" />}
                        </div>
                        <p className="text-lg">
                          {videoError[index] ? "वीडियो लोड नहीं हो सका" : "Video Player"}
                        </p>
                        <p className="text-sm mt-2">{reel.title}</p>
                        {videoError[index] && <Button variant="outline" size="sm" className="mt-4" onClick={() => {
                  setVideoError(prev => ({
                    ...prev,
                    [index]: false
                  }));
                  setVideoLoading(prev => ({
                    ...prev,
                    [index]: true
                  }));
                  const video = videoRefs.current[index];
                  if (video) {
                    video.load();
                  }
                }}>
                            पुनः प्रयास करें
                          </Button>}
                      </div>
                    </div>}
                </div>)}
            </div>

            {/* Controls Overlay */}
            <div className="absolute inset-0 z-10" onClick={togglePlay}>
              {!isPlaying && <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-black/50 flex items-center justify-center">
                    <Play className="w-8 h-8 text-white ml-1" />
                  </div>
                </div>}
            </div>

            {/* Interaction Panel */}
            <div className="absolute right-4 bottom-20 z-20">
              <ReelInteractionPanel 
                reelId={reel.id}
                initialLikes={reel.likes_count || 0}
                initialComments={reel.comments_count || 0}
              />
            </div>

            {/* Audio Control */}
            <div className="absolute top-20 right-4 z-20">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={e => {
                  e.stopPropagation();
                  toggleMute();
                }} 
                className="w-10 h-10 rounded-full bg-black/30 text-white hover:bg-black/50"
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </Button>
            </div>

            {/* Bottom Content */}
            <div className="absolute bottom-4 left-4 right-20 z-20">
              <h3 className="text-white font-semibold text-lg mb-2">
                {reel.title}
              </h3>
              <p className="text-white/80 text-sm leading-relaxed">
                {reel.description}
              </p>
            </div>
          </div>)}
      </div>

      {/* Swipe Indicators */}
      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 z-30">
        
      </div>
    </div>;
};
export default Reels;