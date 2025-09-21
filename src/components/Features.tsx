import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, MapPin, Crown, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Features = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Play,
      title: "रील्स",
      subtitle: "Reels",
      description: "पवित्र कहानियों के मनमोहक वीडियो",
      englishDesc: "Captivating videos of sacred stories",
      onClick: () => navigate("/reels"),
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: MapPin,
      title: "पवित्र स्थल",
      subtitle: "Sacred Places",
      description: "जीवन में अवश्य देखने योग्य तीर्थ स्थान",
      englishDesc: "Must-visit pilgrimage sites in lifetime",
      onClick: () => navigate("/places"),
      gradient: "from-blue-500 to-purple-500"
    },
    {
      icon: Crown,
      title: "देवी देवता",
      subtitle: "Hindu Gods",
      description: "हिंदू देवी-देवताओं के पावन नाम",
      englishDesc: "Sacred names of Hindu deities",
      onClick: () => navigate("/gods"),
      gradient: "from-yellow-500 to-orange-500"
    },
    {
      icon: BookOpen,
      title: "शास्त्र",
      subtitle: "Scriptures",
      description: "प्राचीन हिंदू धर्मग्रंथों का खजाना",
      englishDesc: "Treasury of ancient Hindu scriptures",
      onClick: () => navigate("/scriptures"),
      gradient: "from-green-500 to-teal-500"
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 sacred-text">
            आध्यात्मिक सुविधाएं
          </h2>
          <p className="text-xl text-muted-foreground">
            Explore the divine features of our spiritual journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index} 
                className="cosmic-card group cursor-pointer h-full"
                onClick={feature.onClick}
              >
                <CardContent className="p-8 text-center h-full flex flex-col">
                  <div className={`w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r ${feature.gradient} 
                                 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-2 text-foreground">
                    {feature.title}
                  </h3>
                  <h4 className="text-lg font-semibold mb-3 text-accent">
                    {feature.subtitle}
                  </h4>
                  
                  <p className="text-muted-foreground mb-2 flex-grow">
                    {feature.description}
                  </p>
                  <p className="text-sm text-muted-foreground/70 mb-6">
                    {feature.englishDesc}
                  </p>
                  
                  <Button 
                    variant="outline" 
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground 
                             transition-all duration-300 border-primary/20 hover:border-primary"
                  >
                    खोजें | Explore
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;