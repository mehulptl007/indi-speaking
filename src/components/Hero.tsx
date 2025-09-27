import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useHeroPages } from "@/hooks/useHeroPages";
import { useState, useEffect, useRef } from "react";

const Hero = () => {
  const { heroPages, loading } = useHeroPages();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-rotation every 5 seconds
  useEffect(() => {
    if (!isPaused && heroPages.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % heroPages.length);
      }, 5000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPaused, heroPages.length]);

  // Touch/Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    setIsPaused(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && heroPages.length > 1) {
      setCurrentIndex((prev) => (prev + 1) % heroPages.length);
    }
    if (isRightSwipe && heroPages.length > 1) {
      setCurrentIndex((prev) => (prev - 1 + heroPages.length) % heroPages.length);
    }
    
    setTimeout(() => setIsPaused(false), 3000); // Resume after 3 seconds
  };

  // Navigation handlers
  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + heroPages.length) % heroPages.length);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 3000);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % heroPages.length);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 3000);
  };

  if (loading || heroPages.length === 0) {
    return (
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading sacred content...</p>
        </div>
      </section>
    );
  }

  const currentPage = heroPages[currentIndex];

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Image with Transition */}
      <div className="absolute inset-0">
        {heroPages.map((page, index) => (
          <div
            key={page.id}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url(${page.background_image_url || '/placeholder.svg'})`
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/40 to-background/80" />
          </div>
        ))}
      </div>
      
      {/* Stars Animation */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div 
            key={i} 
            className="absolute w-1 h-1 bg-accent rounded-full animate-pulse" 
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }} 
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      {heroPages.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 
                     bg-background/20 hover:bg-background/40 backdrop-blur-sm
                     rounded-full p-3 transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6 text-foreground" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 
                     bg-background/20 hover:bg-background/40 backdrop-blur-sm
                     rounded-full p-3 transition-all duration-300 hover:scale-110"
          >
            <ChevronRight className="w-6 h-6 text-foreground" />
          </button>
        </>
      )}

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-4 sacred-text transition-all duration-500">
          {currentPage.title}
        </h1>
        {currentPage.subtitle && (
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-accent transition-all duration-500">
            {currentPage.subtitle}
          </h2>
        )}
        {currentPage.description && (
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed transition-all duration-500">
            {currentPage.description}
          </p>
        )}
        
        <Button 
          variant="default" 
          size="lg" 
          className="bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary 
                   text-primary-foreground font-semibold px-8 py-4 text-lg
                   shadow-cosmic hover:shadow-glow transition-all duration-500
                   rounded-full transform hover:scale-105"
        >
          धर्म की ओर
        </Button>
      </div>

      {/* Page Indicators */}
      {heroPages.length > 1 && (
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
          {heroPages.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                setIsPaused(true);
                setTimeout(() => setIsPaused(false), 3000);
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-accent scale-125' 
                  : 'bg-foreground/30 hover:bg-foreground/50'
              }`}
            />
          ))}
        </div>
      )}

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-accent rounded-full flex justify-center">
          <div className="w-1 h-3 bg-accent rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};
export default Hero;