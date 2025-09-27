import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail, Phone, MapPin, Heart, Star, Target } from "lucide-react";
import { useNavigate } from "react-router-dom";
const AboutUs = () => {
  const navigate = useNavigate();
  return <div className="min-h-screen bg-background">
      {/* Header with Back Button */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center">
          <Button variant="ghost" onClick={() => navigate(-1)} className="mr-4">
            <ArrowLeft className="w-5 h-5 mr-2" />
            वापस | Back
          </Button>
          <h1 className="text-2xl font-bold sacred-text">हमारे बारे में | About Us</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Company Mission & Vision */}
        <section className="mb-12">
          <Card className="cosmic-card">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl md:text-4xl sacred-text mb-4">
                धर्मयुग - आध्यात्मिक यात्रा का साथी
              </CardTitle>
              <p className="text-xl text-accent font-semibold">
                DHARMAYUGA - Your Spiritual Journey Companion
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-foreground">हमारा उद्देश्य</h3>
                  <h4 className="text-lg font-semibold mb-2 text-accent">Our Mission</h4>
                  <p className="text-muted-foreground">
                    पवित्र हिंदू धर्म और संस्कृति को डिजिटल माध्यम से नई पीढ़ी तक पहुंचाना और आध्यात्मिक ज्ञान का प्रसार करना।
                  </p>
                  <p className="text-sm text-muted-foreground/80 mt-2">
                    To bring sacred Hindu religion and culture to the new generation through digital means and spread spiritual knowledge.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                    <Star className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-foreground">हमारा दृष्टिकोण</h3>
                  <h4 className="text-lg font-semibold mb-2 text-accent">Our Vision</h4>
                  <p className="text-muted-foreground">
                    प्रत्येक व्यक्ति को अपनी आध्यात्मिक यात्रा में मार्गदर्शन प्रदान करना और धर्म की सच्ची शिक्षा देना।
                  </p>
                  <p className="text-sm text-muted-foreground/80 mt-2">
                    To provide guidance to every individual in their spiritual journey and impart true teachings of dharma.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-foreground">भविष्य के लक्ष्य</h3>
                  <h4 className="text-lg font-semibold mb-2 text-accent">Future Goals</h4>
                  <p className="text-muted-foreground">
                    वैश्विक स्तर पर हिंदू संस्कृति का प्रचार-प्रसार करना और आधुनिक तकनीक के साथ पारंपरिक ज्ञान को जोड़ना।
                  </p>
                  <p className="text-sm text-muted-foreground/80 mt-2">
                    To promote Hindu culture globally and combine traditional knowledge with modern technology.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Founders Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8 sacred-text">
            संस्थापक | Our Founders
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Founder 1 */}
            <Card className="cosmic-card">
              <CardHeader className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                  <div className="w-28 h-28 rounded-full bg-muted flex items-center justify-center">
                    <div className="text-4xl">🕉️</div>
                  </div>
                </div>
                <CardTitle className="text-2xl sacred-text">Virendra Pal</CardTitle>
                <p className="text-lg text-accent font-semibold">
              </p>
                <p className="text-muted-foreground">संस्थापक एवं मुख्य कार्यकारी अधिकारी</p>
                <p className="text-sm text-muted-foreground/80">Founder & Chief Executive Officer</p>
              </CardHeader>
              <CardContent>
                
                <p className="text-sm text-muted-foreground/80 mb-4">
              </p>
                
              </CardContent>
            </Card>

            {/* Founder 2 */}
            <Card className="cosmic-card">
              <CardHeader className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                  <div className="w-28 h-28 rounded-full bg-muted flex items-center justify-center">
                    <div className="text-4xl">🙏</div>
                  </div>
                </div>
                <CardTitle className="text-2xl sacred-text">Mehul Patel</CardTitle>
                <p className="text-lg text-accent font-semibold">
              </p>
                <p className="text-muted-foreground">सह-संस्थापक एवं रचनात्मक निदेशक</p>
                <p className="text-sm text-muted-foreground/80">Co-Founder & Creative Director</p>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
              </p>
                <p className="text-sm text-muted-foreground/80 mb-4">
              </p>
                
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Development Story */}
        <section className="mb-12">
          <Card className="cosmic-card">
            <CardHeader>
              <CardTitle className="text-2xl text-center sacred-text">
                विकास की प्रेरणा | Development Motivation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                आज के डिजिटल युग में युवाओं का धर्म और संस्कृति से दूर होना हमारे लिए चिंता का विषय था। हमने देखा कि पारंपरिक धार्मिक शिक्षा 
                आधुनिक पीढ़ी तक नहीं पहुंच पा रही थी। इसी समस्या के समाधान के लिए हमने धर्मयुग ऐप का विकास किया।
              </p>
              <p className="text-sm text-muted-foreground/80">
                In today's digital age, the distancing of youth from religion and culture was a matter of concern for us. We observed that 
                traditional religious education was not reaching the modern generation. To solve this problem, we developed the Dharmayuga app.
              </p>
              <p className="text-muted-foreground">
                हमारा लक्ष्य है कि प्रत्येक व्यक्ति को अपनी सुविधा के अनुसार धार्मिक ज्ञान प्राप्त करने का अवसर मिले। चाहे वो छोटे वीडियो रील्स हों, 
                पवित्र स्थलों की जानकारी हो, या फिर देवी-देवताओं की कथाएं - सभी कुछ एक ही स्थान पर उपलब्ध है।
              </p>
              <p className="text-sm text-muted-foreground/80">
                Our goal is that every person gets the opportunity to acquire religious knowledge according to their convenience. Whether it's 
                short video reels, information about sacred places, or stories of gods and goddesses - everything is available in one place.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Contact Information */}
        <section>
          <Card className="cosmic-card">
            <CardHeader>
              
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                

                

                
              </div>

              <div className="mt-8 text-center">
                <p className="text-muted-foreground mb-4">
                  हमारे साथ जुड़ें और आध्यात्मिक यात्रा में भागीदार बनें। आपके सुझाव और प्रतिक्रिया हमारे लिए अमूल्य हैं।
                </p>
                <p className="text-sm text-muted-foreground/80">
                  Join us and become a partner in the spiritual journey. Your suggestions and feedback are invaluable to us.
                </p>
                
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>;
};
export default AboutUs;