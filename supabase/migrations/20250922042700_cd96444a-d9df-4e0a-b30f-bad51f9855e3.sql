-- Add RLS policies for CDimage table to fix security warning (with correct case)
CREATE POLICY "Everyone can view CDimages" 
ON public."CDimage"
FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can create CDimages" 
ON public."CDimage"
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update CDimages" 
ON public."CDimage"
FOR UPDATE 
USING (auth.uid() IS NOT NULL);