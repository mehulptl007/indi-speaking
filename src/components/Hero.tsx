import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-temple-cosmic.jpg";
const Hero = () => {
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{
      backgroundImage: `url(${heroImage})`
    }}>
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/40 to-background/80" />
      </div>
      
      {/* Stars Animation */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => <div key={i} className="absolute w-1 h-1 bg-accent rounded-full animate-pulse" style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 3}s`,
        animationDuration: `${2 + Math.random() * 2}s`
      }} />)}
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-6xl font-bold mb-6 sacred-text md:text-7xl mx-[10px] py-[50px] px-[50px] my-px">धर्मयुग</h1>
        <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-accent">DHARMAYUGA</h2>
        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
          पवित्र हिंदू पुराणों की अनंत कहानियां। देवताओं, ऋषियों और पावन स्थलों की 
          दिव्य यात्रा में शामिल हों।
        </p>
        <p className="text-sm md:text-base text-muted-foreground/80 mb-12 max-w-xl mx-auto">
          Discover infinite stories of sacred Hindu mythology. Join the divine journey 
          of gods, sages, and holy places.
        </p>
        
        <Button variant="default" size="lg" className="bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary 
                     text-primary-foreground font-semibold px-8 py-4 text-lg
                     shadow-cosmic hover:shadow-glow transition-all duration-500
                     rounded-full transform hover:scale-105">
          यात्रा प्रारंभ करें | Begin Journey
        </Button>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-accent rounded-full flex justify-center">
          <div className="w-1 h-3 bg-accent rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>;
};
export default Hero;