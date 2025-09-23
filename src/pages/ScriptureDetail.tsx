import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, PlayCircle } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useScriptures, useScriptureSections } from "@/hooks/useScriptures";
import { Skeleton } from "@/components/ui/skeleton";

const ScriptureDetail = () => {
  const navigate = useNavigate();
  const { scriptureId } = useParams<{ scriptureId: string }>();
  const { scriptures, loading: scripturesLoading } = useScriptures();
  const { sections, loading: sectionsLoading, error } = useScriptureSections(scriptureId || '');

  const scripture = scriptures.find(s => s.id === scriptureId);
  const loading = scripturesLoading || sectionsLoading;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <Skeleton className="h-10 w-10" />
            <Skeleton className="h-8 w-32" />
          </div>
          <div className="text-center mb-12">
            <Skeleton className="h-32 w-32 rounded-full mx-auto mb-4" />
            <Skeleton className="h-12 w-64 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.from({ length: 2 }).map((_, i) => (
              <Skeleton key={i} className="h-32 w-full" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !scripture) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-destructive mb-4">Error</h2>
          <p className="text-muted-foreground">{error || 'Scripture not found'}</p>
          <Button onClick={() => navigate('/scriptures')} className="mt-4">
            Go Back
          </Button>
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
            onClick={() => navigate('/scriptures')}
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
        {/* Scripture Profile */}
        <div className="text-center mb-12 pt-8">
          <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center overflow-hidden">
            {scripture.image_url ? (
              <img 
                src={scripture.image_url} 
                alt={scripture.name}
                className="w-full h-full object-cover"  
              />
            ) : (
              <div className="text-4xl sacred-text text-primary">
                {scripture.name.charAt(0)}
              </div>
            )}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4 sacred-text">
            {scripture.name}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {scripture.description}
          </p>
        </div>

        {/* Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sections.map((section) => (
            <Card 
              key={section.id}
              className="group cursor-pointer hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur-sm border-2 hover:border-primary/50 hover:scale-105"
              onClick={() => navigate(`/scriptures/${scripture.id}/sections/${section.id}`)}
            >
              <CardHeader>
                <CardTitle className="text-xl sacred-text group-hover:text-primary transition-colors text-center">
                  {section.section_name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-20 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg flex items-center justify-center">
                  <div className="text-2xl sacred-text text-primary/60">
                    {section.section_name.charAt(0)}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {sections.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground">कोई विभाग नहीं मिले</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default ScriptureDetail;