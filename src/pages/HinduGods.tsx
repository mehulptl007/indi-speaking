import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, PlayCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGods } from "@/hooks/useGods";
import { Skeleton } from "@/components/ui/skeleton";

const HinduGods = () => {
  const navigate = useNavigate();
  const { gods, loading, error } = useGods();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <Skeleton className="h-10 w-10" />
            <Skeleton className="h-8 w-32" />
          </div>
          <Skeleton className="h-12 w-64 mx-auto mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-96 w-full" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-destructive mb-4">Error</h2>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-4xl mx-auto p-4 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            className="hover:bg-muted"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            वापस
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/reels')}
            className="hover:bg-primary hover:text-primary-foreground"
          >
            <PlayCircle className="w-4 h-4 mr-2" />
            रील्स देखें
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto p-4">
        <div className="text-center mb-12 pt-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4 sacred-text">
            हिन्दू देवता
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            त्रिमूर्ति - सृष्टि के रचयिता, पालनकर्ता और संहारकर्ता
          </p>
        </div>

        {/* Gods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {gods.map((god) => (
            <Card 
              key={god.id}
              className="group cursor-pointer hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur-sm border-2 hover:border-primary/50 hover:scale-105"
              onClick={() => navigate(`/gods/${god.id}`)}
            >
              <CardHeader className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center overflow-hidden">
                  {god.image_url ? (
                    <img 
                      src={god.image_url} 
                      alt={god.name}
                      className="w-full h-full object-cover"  
                    />
                  ) : (
                    <div className="text-4xl sacred-text text-primary">
                      {god.name.charAt(0)}
                    </div>
                  )}
                </div>
                <CardTitle className="text-2xl sacred-text group-hover:text-primary transition-colors">
                  {god.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-muted-foreground line-clamp-3">
                  {god.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {gods.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground">कोई देवता नहीं मिले</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default HinduGods;