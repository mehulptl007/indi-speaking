import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, PlayCircle, Book, Scroll } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useScriptures } from "@/hooks/useScriptures";
import { Skeleton } from "@/components/ui/skeleton";

const Scriptures = () => {
  const navigate = useNavigate();
  const { scriptures, loading, error, getScripturesByCategory } = useScriptures();

  const epics = getScripturesByCategory('epics');
  const vedas = getScripturesByCategory('vedas');

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <Skeleton className="h-10 w-10" />
            <Skeleton className="h-8 w-32" />
          </div>
          <Skeleton className="h-12 w-64 mx-auto mb-12" />
          <div className="space-y-12">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i}>
                <Skeleton className="h-8 w-32 mb-6" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {Array.from({ length: 3 }).map((_, j) => (
                    <Skeleton key={j} className="h-64 w-full" />
                  ))}
                </div>
              </div>
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
        <div className="max-w-6xl mx-auto p-4 flex items-center justify-between">
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
      <main className="max-w-6xl mx-auto p-4">
        <div className="text-center mb-12 pt-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4 sacred-text">
            शास्त्र
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            प्राचीन ज्ञान का खजाना - महाकाव्य और वेद
          </p>
        </div>

        {/* Epics Section */}
        {epics.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center mb-6">
              <Book className="w-6 h-6 mr-3 text-primary" />
              <h2 className="text-3xl font-bold sacred-text">महाकाव्य</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {epics.map((scripture) => (
                <Card 
                  key={scripture.id}
                  className="group cursor-pointer hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur-sm border-2 hover:border-primary/50 hover:scale-105"
                  onClick={() => navigate(`/scriptures/${scripture.id}`)}
                >
                  <CardHeader className="text-center">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-orange-400/20 to-red-500/20 flex items-center justify-center overflow-hidden">
                      {scripture.image_url ? (
                        <img 
                          src={scripture.image_url} 
                          alt={scripture.name}
                          className="w-full h-full object-cover"  
                        />
                      ) : (
                        <Book className="w-8 h-8 text-orange-500" />
                      )}
                    </div>
                    <CardTitle className="text-xl sacred-text group-hover:text-primary transition-colors">
                      {scripture.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center text-muted-foreground line-clamp-3">
                      {scripture.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Vedas Section */}
        {vedas.length > 0 && (
          <section>
            <div className="flex items-center mb-6">
              <Scroll className="w-6 h-6 mr-3 text-accent" />
              <h2 className="text-3xl font-bold sacred-text">वेद</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {vedas.map((scripture) => (
                <Card 
                  key={scripture.id}
                  className="group cursor-pointer hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur-sm border-2 hover:border-accent/50 hover:scale-105"
                  onClick={() => navigate(`/scriptures/${scripture.id}`)}
                >
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center overflow-hidden">
                      {scripture.image_url ? (
                        <img 
                          src={scripture.image_url} 
                          alt={scripture.name}
                          className="w-full h-full object-cover"  
                        />
                      ) : (
                        <Scroll className="w-6 h-6 text-accent" />
                      )}
                    </div>
                    <CardTitle className="text-lg sacred-text group-hover:text-accent transition-colors">
                      {scripture.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center text-muted-foreground text-sm line-clamp-2">
                      {scripture.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {scriptures.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground">कोई शास्त्र नहीं मिले</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Scriptures;