-- Create reels table for Hindu mythology videos
CREATE TABLE public.reels (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  video_url TEXT NOT NULL,
  thumbnail_url TEXT,
  likes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  shares_count INTEGER DEFAULT 0,
  category TEXT DEFAULT 'mythology',
  uploaded_by TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.reels ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (since reels are public content)
CREATE POLICY "Everyone can view reels" 
ON public.reels 
FOR SELECT 
USING (true);

-- Create policies for inserting reels (for content creators)
CREATE POLICY "Authenticated users can create reels" 
ON public.reels 
FOR INSERT 
WITH CHECK (true);

-- Create policies for updating reels
CREATE POLICY "Authenticated users can update reels" 
ON public.reels 
FOR UPDATE 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_reels_updated_at
BEFORE UPDATE ON public.reels
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample data for Hindu mythology reels
INSERT INTO public.reels (title, description, video_url, thumbnail_url, likes_count, comments_count, shares_count, category) VALUES
('राम जी का वन गमन', 'भगवान राम के 14 वर्षीय वनवास की पावन कथा। सीता माता और लक्ष्मण जी के साथ वन में बिताए गए दिनों की गाथा।', 'https://example.com/video1.mp4', 'https://tgahlpsipxiokkkppgci.supabase.co/storage/v1/object/sign/Image_Source_CharDham/rama_vanvas.jpg', 1245, 89, 156, 'ramayana'),
('कृष्ण लीला', 'श्री कृष्ण की बचपन की मनमोहक लीलाएं। माखन चोरी और गोपियों के साथ बिताए पल की मधुर यादें।', 'https://example.com/video2.mp4', 'https://tgahlpsipxiokkkppgci.supabase.co/storage/v1/object/sign/Image_Source_CharDham/krishna1.jpeg', 2341, 234, 445, 'krishna'),
('शिव महिमा', 'भोलेनाथ की महानता और उनकी अनंत शक्तियों की गाथा। नीलकंठ की महानता और संसार कल्याण की कथा।', 'https://example.com/video3.mp4', 'https://tgahlpsipxiokkkppgci.supabase.co/storage/v1/object/sign/Image_Source_CharDham/shiva_mahatmya.jpg', 3421, 567, 789, 'shiva'),
('हनुमान चालीसा की महिमा', 'हनुमान चालीसा के पाठ से मिलने वाले अद्भुत फायदे और बजरंगबली की कृपा की कहानियां।', 'https://example.com/video4.mp4', 'https://tgahlpsipxiokkkppgci.supabase.co/storage/v1/object/sign/Image_Source_CharDham/Hanuman1.png', 1876, 145, 298, 'hanuman'),
('दुर्गा माता की शक्ति', 'मां दुर्गा के नौ रूपों की महिमा और नवरात्रि के पावन पर्व का महत्व।', 'https://example.com/video5.mp4', 'https://tgahlpsipxiokkkppgci.supabase.co/storage/v1/object/sign/Image_Source_CharDham/durga_mata.jpg', 2987, 312, 567, 'devi');

-- Create storage bucket for reels videos if not exists
INSERT INTO storage.buckets (id, name, public) 
VALUES ('reels-videos', 'reels-videos', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies for reels videos
CREATE POLICY "Public Access to Reels Videos" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'reels-videos');

CREATE POLICY "Authenticated users can upload reels videos" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'reels-videos' AND auth.uid() IS NOT NULL);