import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Heart, Share2, MessageCircle, Play, Pause, Volume2, VolumeX, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ReelData {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  likes: number;
  comments: number;
  shares: number;
}

// Mock data - In real app, this would come from API
const mockReels: ReelData[] = [
  {
    id: "1",
    title: "राम जी का वन गमन",
    description: "भगवान राम के 14 वर्षीय वनवास की पावन कथा। सीता माता और लक्ष्मण जी के साथ...",
    videoUrl: "https://example.com/video1.mp4",
    likes: 1245,
    comments: 89,
    shares: 156
  },
  {
    id: "2", 
    title: "कृष्ण लीला",
    description: "श्री कृष्ण की बचपन की मनमोहक लीलाएं। माखन चोरी और गोपियों के साथ...",
    videoUrl: "https://example.com/video2.mp4",
    likes: 2341,
    comments: 234,
    shares: 445
  },
  {
    id: "3",
    title: "शिव महिमा",
    description: "भोलेनाथ की महानता और उनकी अनंत शक्तियों की गाथा...",
    videoUrl: "https://example.com/video3.mp4", 
    likes: 3421,
    comments: 567,
    shares: 789
  }
];

const Reels = () => {
  const navigate = useNavigate();
  const [currentReelIndex, setCurrentReelIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentReel = mockReels[currentReelIndex];

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

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleSwipeUp = () => {
    if (currentReelIndex < mockReels.length - 1) {
      setCurrentReelIndex(prev => prev + 1);
    }
  };

  const handleSwipeDown = () => {
    if (currentReelIndex > 0) {
      setCurrentReelIndex(prev => prev - 1);
    }
  };

  const formatCount = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

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
        className="relative w-full h-full"
        style={{ transform: `translateY(-${currentReelIndex * 100}vh)` }}
      >
        {mockReels.map((reel, index) => (
          <div
            key={reel.id}
            className="absolute inset-0 flex items-center justify-center"
            style={{ top: `${index * 100}vh` }}
          >
            {/* Video Background - Placeholder for now */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
              <div className="absolute inset-0 bg-black/20"></div>
              {/* Placeholder for video */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white/80">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center">
                    <Play className="w-12 h-12" />
                  </div>
                  <p className="text-lg">Video Player Placeholder</p>
                  <p className="text-sm mt-2">{reel.title}</p>
                </div>
              </div>
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
                className="w-12 h-12 rounded-full bg-black/30 text-white hover:bg-black/50 flex flex-col p-0"
              >
                <Heart className="w-6 h-6 mb-1" />
                <span className="text-xs">{formatCount(reel.likes)}</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="w-12 h-12 rounded-full bg-black/30 text-white hover:bg-black/50 flex flex-col p-0"
              >
                <MessageCircle className="w-6 h-6 mb-1" />
                <span className="text-xs">{formatCount(reel.comments)}</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="w-12 h-12 rounded-full bg-black/30 text-white hover:bg-black/50 flex flex-col p-0"
              >
                <Share2 className="w-6 h-6 mb-1" />
                <span className="text-xs">{formatCount(reel.shares)}</span>
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
            {mockReels.map((_, index) => (
              <div
                key={index}
                className={`w-1 h-6 rounded-full ${
                  index === currentReelIndex ? 'bg-white' : 'bg-white/30'
                }`}
              />
            ))}
          </div>

          {currentReelIndex < mockReels.length - 1 && (
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