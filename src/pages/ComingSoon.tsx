import { Button } from "@/components/ui/button";
import { ArrowLeft, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ComingSoonProps {
  title: string;
}

const ComingSoon = ({ title }: ComingSoonProps) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      {/* Background Stars */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-accent rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
        <div className="mb-8 relative">
          <Sparkles className="w-16 h-16 mx-auto text-accent mb-4 animate-pulse" />
          <div className="absolute -top-2 -left-2 w-20 h-20 border-2 border-accent/20 rounded-full animate-spin" style={{ animationDuration: '8s' }} />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-6 sacred-text">
          {title}
        </h1>
        
        <p className="text-xl text-muted-foreground mb-4">
          जल्द ही आ रहा है...
        </p>
        <p className="text-lg text-muted-foreground/80 mb-8">
          Coming Soon...
        </p>
        
        <p className="text-muted-foreground mb-12 leading-relaxed">
          हम इस पवित्र अनुभाग को तैयार कर रहे हैं। कृपया थोड़ा धैर्य रखें और जल्द ही वापस आएं।
          <br />
          <span className="text-sm">
            We are preparing this sacred section. Please be patient and come back soon.
          </span>
        </p>
        
        <div className="space-y-4">
          <Button 
            onClick={() => navigate("/")}
            variant="default"
            size="lg"
            className="bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary 
                       text-primary-foreground font-semibold px-8 py-3
                       shadow-cosmic hover:shadow-glow transition-all duration-500
                       rounded-full transform hover:scale-105"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            मुख्य पृष्ठ पर वापस जाएं
          </Button>
          
          <Button 
            onClick={() => navigate("/reels")}
            variant="outline"
            size="lg"
            className="border-primary/20 hover:border-primary hover:bg-primary hover:text-primary-foreground
                       transition-all duration-300 rounded-full px-8 py-3"
          >
            रील्स देखें | Watch Reels
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;