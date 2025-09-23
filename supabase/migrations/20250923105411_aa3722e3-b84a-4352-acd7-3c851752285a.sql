-- Create gods table
CREATE TABLE public.gods (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create god_sections table
CREATE TABLE public.god_sections (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  god_id UUID NOT NULL REFERENCES public.gods(id) ON DELETE CASCADE,
  section_name TEXT NOT NULL,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create god_content table
CREATE TABLE public.god_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  god_id UUID NOT NULL REFERENCES public.gods(id) ON DELETE CASCADE,
  section_id UUID NOT NULL REFERENCES public.god_sections(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  image_url TEXT,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create scriptures table
CREATE TABLE public.scriptures (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL, -- 'epics' or 'vedas'
  description TEXT,
  image_url TEXT,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create scripture_sections table
CREATE TABLE public.scripture_sections (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  scripture_id UUID NOT NULL REFERENCES public.scriptures(id) ON DELETE CASCADE,
  section_name TEXT NOT NULL,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create scripture_content table
CREATE TABLE public.scripture_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  scripture_id UUID NOT NULL REFERENCES public.scriptures(id) ON DELETE CASCADE,
  section_id UUID NOT NULL REFERENCES public.scripture_sections(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  image_url TEXT,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.gods ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.god_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.god_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scriptures ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scripture_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scripture_content ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Everyone can view gods" ON public.gods FOR SELECT USING (true);
CREATE POLICY "Everyone can view god_sections" ON public.god_sections FOR SELECT USING (true);
CREATE POLICY "Everyone can view god_content" ON public.god_content FOR SELECT USING (true);
CREATE POLICY "Everyone can view scriptures" ON public.scriptures FOR SELECT USING (true);
CREATE POLICY "Everyone can view scripture_sections" ON public.scripture_sections FOR SELECT USING (true);
CREATE POLICY "Everyone can view scripture_content" ON public.scripture_content FOR SELECT USING (true);

-- Create policies for authenticated users to manage content
CREATE POLICY "Authenticated users can create gods" ON public.gods FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can update gods" ON public.gods FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can delete gods" ON public.gods FOR DELETE USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can create god_sections" ON public.god_sections FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can update god_sections" ON public.god_sections FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can delete god_sections" ON public.god_sections FOR DELETE USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can create god_content" ON public.god_content FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can update god_content" ON public.god_content FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can delete god_content" ON public.god_content FOR DELETE USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can create scriptures" ON public.scriptures FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can update scriptures" ON public.scriptures FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can delete scriptures" ON public.scriptures FOR DELETE USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can create scripture_sections" ON public.scripture_sections FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can update scripture_sections" ON public.scripture_sections FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can delete scripture_sections" ON public.scripture_sections FOR DELETE USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can create scripture_content" ON public.scripture_content FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can update scripture_content" ON public.scripture_content FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can delete scripture_content" ON public.scripture_content FOR DELETE USING (auth.uid() IS NOT NULL);

-- Add triggers for updated_at
CREATE TRIGGER update_gods_updated_at BEFORE UPDATE ON public.gods FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_god_content_updated_at BEFORE UPDATE ON public.god_content FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_scriptures_updated_at BEFORE UPDATE ON public.scriptures FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_scripture_content_updated_at BEFORE UPDATE ON public.scripture_content FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample data for gods (Trimurti)
INSERT INTO public.gods (name, description, image_url, order_index) VALUES
('महादेव', 'शिव जी सृष्टि के संहारकर्ता और कल्याणकारी देव हैं। वे योगी, नटराज और महाकाल के रूप में पूजे जाते हैं।', '/placeholder.svg', 1),
('विष्णु', 'विष्णु जी सृष्टि के पालनकर्ता हैं। वे दशावतार के रूप में धर्म की रक्षा के लिए अवतार लेते हैं।', '/placeholder.svg', 2),
('ब्रह्मा', 'ब्रह्मा जी सृष्टि के रचयिता हैं। वे चार मुख वाले और सरस्वती के पति हैं।', '/placeholder.svg', 3);

-- Insert sample sections for each god
INSERT INTO public.god_sections (god_id, section_name, order_index)
SELECT g.id, section_name, order_index FROM public.gods g
CROSS JOIN (
  VALUES 
    ('शक्ति', 1),
    ('परिवार', 2),
    ('भक्त', 3),
    ('श्लोक', 4)
) AS sections(section_name, order_index);

-- Insert sample scriptures
INSERT INTO public.scriptures (name, category, description, image_url, order_index) VALUES
('रामायण', 'epics', 'महर्षि वाल्मीकि द्वारा रचित भगवान राम की गाथा', '/placeholder.svg', 1),
('महाभारत', 'epics', 'व्यास जी द्वारा रचित विश्व का सबसे बड़ा महाकाव्य', '/placeholder.svg', 2),
('गीता', 'epics', 'भगवान श्री कृष्ण द्वारा अर्जुन को दिया गया उपदेश', '/placeholder.svg', 3),
('ऋग्वेद', 'vedas', 'सबसे प्राचीन वेद, जिसमें देवताओं की स्तुति के मंत्र हैं', '/placeholder.svg', 4),
('यजुर्वेद', 'vedas', 'यज्ञ संबंधी मंत्रों का संग्रह', '/placeholder.svg', 5),
('सामवेद', 'vedas', 'संगीत और गान से संबंधित मंत्रों का वेद', '/placeholder.svg', 6),
('अथर्ववेद', 'vedas', 'दैनिक जीवन और आयुर्वेद से संबंधित ज्ञान का वेद', '/placeholder.svg', 7);

-- Insert sample sections for scriptures
INSERT INTO public.scripture_sections (scripture_id, section_name, order_index)
SELECT s.id, section_name, order_index FROM public.scriptures s
CROSS JOIN (
  VALUES 
    ('महत्व', 1),
    ('ऐतिहासिक काल', 2)
) AS sections(section_name, order_index);