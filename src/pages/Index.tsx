import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <Features />
        
        {/* About Us Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Button
              onClick={() => navigate('/about')}
              variant="outline"
              size="lg"
              className="bg-gradient-to-r from-card to-card/80 hover:from-primary/10 hover:to-accent/10
                       border-primary/20 hover:border-primary text-foreground hover:text-primary
                       font-semibold px-8 py-4 text-lg shadow-glow hover:shadow-cosmic
                       transition-all duration-500 rounded-full transform hover:scale-105"
            >
              <Info className="w-5 h-5 mr-2" />
              हमारे बारे में जानें | Learn About Us
            </Button>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              धर्मयुग की यात्रा, हमारे संस्थापकों और हमारे मिशन के बारे में जानें।
            </p>
            <p className="text-sm text-muted-foreground/80 max-w-xl mx-auto">
              Learn about Dharmayuga's journey, our founders, and our mission.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
