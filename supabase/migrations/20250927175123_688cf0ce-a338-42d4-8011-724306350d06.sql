-- Create hero_pages table for dynamic hero carousel
CREATE TABLE public.hero_pages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  subtitle VARCHAR(150),
  description TEXT,
  background_image_url VARCHAR(500),
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.hero_pages ENABLE ROW LEVEL SECURITY;

-- Create policies for hero_pages
CREATE POLICY "Everyone can view hero_pages" 
ON public.hero_pages 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Authenticated users can create hero_pages" 
ON public.hero_pages 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update hero_pages" 
ON public.hero_pages 
FOR UPDATE 
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete hero_pages" 
ON public.hero_pages 
FOR DELETE 
USING (auth.uid() IS NOT NULL);

-- Create reel_likes table for like functionality
CREATE TABLE public.reel_likes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  reel_id UUID NOT NULL REFERENCES public.reels(id) ON DELETE CASCADE,
  user_session_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(reel_id, user_session_id)
);

-- Enable RLS
ALTER TABLE public.reel_likes ENABLE ROW LEVEL SECURITY;

-- Create policies for reel_likes
CREATE POLICY "Everyone can view reel_likes" 
ON public.reel_likes 
FOR SELECT 
USING (true);

CREATE POLICY "Everyone can create reel_likes" 
ON public.reel_likes 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Everyone can delete their own reel_likes" 
ON public.reel_likes 
FOR DELETE 
USING (true);

-- Create reel_comments table for comment functionality
CREATE TABLE public.reel_comments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  reel_id UUID NOT NULL REFERENCES public.reels(id) ON DELETE CASCADE,
  user_name VARCHAR(100) NOT NULL,
  comment_text TEXT NOT NULL CHECK (length(comment_text) <= 500),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.reel_comments ENABLE ROW LEVEL SECURITY;

-- Create policies for reel_comments
CREATE POLICY "Everyone can view reel_comments" 
ON public.reel_comments 
FOR SELECT 
USING (true);

CREATE POLICY "Everyone can create reel_comments" 
ON public.reel_comments 
FOR INSERT 
WITH CHECK (true);

-- Add trigger for timestamps on hero_pages
CREATE TRIGGER update_hero_pages_updated_at
BEFORE UPDATE ON public.hero_pages
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Add trigger for timestamps on reel_comments
CREATE TRIGGER update_reel_comments_updated_at
BEFORE UPDATE ON public.reel_comments
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample hero pages data
INSERT INTO public.hero_pages (title, subtitle, description, background_image_url, display_order) VALUES
('धर्मयुग में आपका स्वागत है', 'Welcome to Dharmayuga', 'पवित्र हिंदू पुराणों की अनंत कहानियां। देवताओं, ऋषियों और पावन स्थलों की दिव्य यात्रा में शामिल हों।', 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80', 1),
('पवित्र तीर्थ स्थल', 'Sacred Pilgrimage Sites', 'भारत के सबसे पावन तीर्थ स्थलों की खोज करें। हर स्थल की अपनी अनूठी कहानी और महत्व है।', 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80', 2),
('देवी देवताओं की कथाएं', 'Divine Stories of Gods', 'हिंदू देवी-देवताओं की अमर कथाओं को जानें। प्रत्येक देवता का अपना विशेष स्थान और शक्ति है।', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80', 3),
('प्राचीन शास्त्र ज्ञान', 'Ancient Scripture Wisdom', 'वेद, पुराण और उपनिषदों के गहन ज्ञान की खोज करें। जीवन के हर पहलू के लिए मार्गदर्शन।', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80', 4),
('आध्यात्मिक रील्स', 'Spiritual Reels', 'छोटे वीडियो के माध्यम से धार्मिक कहानियों का आनंद लें। प्रेरणादायक और शिक्षाप्रद सामग्री।', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80', 5);

-- Create index for better performance
CREATE INDEX idx_hero_pages_active_order ON public.hero_pages(is_active, display_order);
CREATE INDEX idx_reel_likes_reel_id ON public.reel_likes(reel_id);
CREATE INDEX idx_reel_comments_reel_id ON public.reel_comments(reel_id);
CREATE INDEX idx_reel_comments_created_at ON public.reel_comments(created_at DESC);