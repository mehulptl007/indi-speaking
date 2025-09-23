import { Button } from "@/components/ui/button";
import { ArrowLeft, PlayCircle } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useGods, useGodSections, useGodContent } from "@/hooks/useGods";
import { Skeleton } from "@/components/ui/skeleton";

const GodContent = () => {
  const navigate = useNavigate();
  const { godId, sectionId } = useParams<{ godId: string; sectionId: string }>();
  const { gods, loading: godsLoading } = useGods();
  const { sections, loading: sectionsLoading } = useGodSections(godId || '');
  const { content, loading: contentLoading, error } = useGodContent(godId || '', sectionId || '');

  const god = gods.find(g => g.id === godId);
  const section = sections.find(s => s.id === sectionId);
  const loading = godsLoading || sectionsLoading || contentLoading;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <Skeleton className="h-10 w-10" />
            <Skeleton className="h-8 w-32" />
          </div>
          <div className="mb-8">
            <Skeleton className="h-96 w-full rounded-lg mb-6" />
            <Skeleton className="h-12 w-3/4 mb-4" />
            <div className="space-y-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-4 w-full" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !god || !section) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-destructive mb-4">Error</h2>
          <p className="text-muted-foreground">{error || 'Content not found'}</p>
          <Button onClick={() => navigate(`/gods/${godId}`)} className="mt-4">
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
        {/* Header */}
        <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
          <div className="max-w-4xl mx-auto p-4 flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(`/gods/${godId}`)}
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

        <div className="max-w-4xl mx-auto p-4 pt-16 text-center">
          <h1 className="text-3xl font-bold sacred-text mb-4">
            {god.name} - {section.section_name}
          </h1>
          <p className="text-muted-foreground">इस विभाग के लिए सामग्री जल्द आएगी।</p>
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
            onClick={() => navigate(`/gods/${godId}`)}
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
      <main className="max-w-4xl mx-auto p-4 pt-8">
        {/* Hero Image */}
        {content.image_url && (
          <div className="mb-8">
            <img 
              src={content.image_url} 
              alt={content.title}
              className="w-full h-96 object-cover rounded-lg shadow-xl"
            />
          </div>
        )}

        {/* Article Content */}
        <article className="bg-card/50 backdrop-blur-sm rounded-lg p-8 shadow-xl">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-6 sacred-text">
            {content.title}
          </h1>
          
          <div className="prose prose-lg max-w-none text-foreground">
            <div className="whitespace-pre-wrap leading-relaxed text-muted-foreground">
              {content.content}
            </div>
          </div>
        </article>
      </main>
    </div>
  );
};

export default GodContent;