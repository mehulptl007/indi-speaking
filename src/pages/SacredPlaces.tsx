import { Button } from "@/components/ui/button";
import { ArrowLeft, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import kedarnathTemple from "@/assets/kedarnath-temple.jpg";
import varanasiGhats from "@/assets/varanasi-ghats.jpg";
import goldenTemple from "@/assets/golden-temple.jpg";
import tirupatiTemple from "@/assets/tirupati-temple.jpg";

const SacredPlaces = () => {
  const navigate = useNavigate();

  const sacredPlaces = [
    {
      id: 1,
      title: "केदारनाथ धाम",
      subtitle: "Kedarnath Temple",
      image: kedarnathTemple,
      description: "भगवान शिव के बारह ज्योतिर्लिंगों में से एक, हिमालय की गोद में स्थित यह पवित्र मंदिर अपनी दिव्य शक्ति के लिए प्रसिद्ध है।",
      gradient: "from-orange-500 via-red-500 to-pink-500"
    },
    {
      id: 2,
      title: "काशी विश्वनाथ",
      subtitle: "Kashi Vishwanath",
      image: varanasiGhats,
      description: "भारत की आध्यात्मिक राजधानी वाराणसी में स्थित यह मंदिर मोक्ष का द्वार माना जाता है और गंगा के पवित्र घाटों से घिरा है।",
      gradient: "from-amber-500 via-yellow-500 to-orange-500"
    },
    {
      id: 3,
      title: "स्वर्ण मंदिर",
      subtitle: "Golden Temple",
      image: goldenTemple,
      description: "अमृतसर में स्थित यह सिख धर्म का सबसे पवित्र गुरुद्वारा है, जो अपने सुनहरे गुंबद और अमृत सरोवर के लिए विश्व प्रसिद्ध है।",
      gradient: "from-yellow-400 via-amber-500 to-orange-600"
    },
    {
      id: 4,
      title: "तिरुपति बालाजी",
      subtitle: "Tirupati Balaji",
      image: tirupatiTemple,
      description: "आंध्र प्रदेश के तिरुमला पहाड़ियों पर स्थित भगवान वेंकटेश्वर का यह मंदिर विश्व का सबसे धनी मंदिर माना जाता है।",
      gradient: "from-red-500 via-pink-500 to-rose-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90">
      {/* Navigation */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-foreground hover:text-primary"
          >
            <ArrowLeft className="w-4 h-4" />
            वापस जाएं
          </Button>
          
          <h1 className="text-xl font-bold sacred-text">पवित्र स्थल</h1>
          
          <Button
            variant="default"
            onClick={() => navigate("/reels")}
            className="flex items-center gap-2 bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90"
          >
            <Play className="w-4 h-4" />
            रील्स देखें
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="pt-20 pb-8">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold sacred-text mb-4">
              पवित्र स्थल
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              भारत के सबसे पवित्र और दिव्य स्थलों की यात्रा करें
            </p>
          </div>

          {/* Sacred Places Sections */}
          <div className="space-y-8">
            {sacredPlaces.map((place, index) => (
              <div
                key={place.id}
                className={`relative overflow-hidden rounded-3xl shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:shadow-3xl ${
                  index % 2 === 0 ? "" : "lg:flex-row-reverse"
                }`}
              >
                <div className={`relative bg-gradient-to-br ${place.gradient} p-1 rounded-3xl`}>
                  <div className="bg-background/95 backdrop-blur-sm rounded-3xl overflow-hidden">
                    <div className="flex flex-col lg:flex-row">
                      {/* Image Section */}
                      <div className={`lg:w-1/2 relative overflow-hidden ${index % 2 === 0 ? "lg:order-1" : "lg:order-2"}`}>
                        <div className="aspect-video lg:aspect-square relative">
                          <img
                            src={place.image}
                            alt={place.title}
                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                          />
                          <div className={`absolute inset-0 bg-gradient-to-t ${place.gradient} opacity-20`}></div>
                          <div className="absolute inset-0 bg-black/10"></div>
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className={`lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center ${index % 2 === 0 ? "lg:order-2" : "lg:order-1"}`}>
                        <div className="space-y-4">
                          <div className={`inline-block px-4 py-2 bg-gradient-to-r ${place.gradient} text-white rounded-full text-sm font-medium`}>
                            Sacred Place #{place.id}
                          </div>
                          
                          <h3 className="text-3xl lg:text-4xl font-bold sacred-text">
                            {place.title}
                          </h3>
                          
                          <h4 className="text-xl text-muted-foreground font-medium">
                            {place.subtitle}
                          </h4>
                          
                          <p className="text-lg text-foreground/80 leading-relaxed">
                            {place.description}
                          </p>
                          
                          <div className="pt-4">
                            <Button
                              variant="outline"
                              className={`border-2 hover:bg-gradient-to-r ${place.gradient} hover:text-white hover:border-transparent transition-all duration-300`}
                            >
                              और पढ़ें
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer CTA */}
          <div className="text-center mt-16 p-8 rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
            <h3 className="text-2xl font-bold sacred-text mb-4">
              और भी पवित्र स्थल देखें
            </h3>
            <p className="text-muted-foreground mb-6">
              हमारे रील्स सेक्शन में और भी दिव्य स्थलों की यात्रा करें
            </p>
            <Button
              onClick={() => navigate("/reels")}
              className="bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 px-8 py-3"
            >
              <Play className="w-5 h-5 mr-2" />
              रील्स देखें
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SacredPlaces;